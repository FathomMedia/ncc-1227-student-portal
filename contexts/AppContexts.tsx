import { API } from "aws-amplify";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/use-auth";
import {
  GetStudentQueryVariables,
  GetStudentQuery,
  Application,
  Status,
} from "../src/API";
import { getStudent } from "../src/graphql/queries";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";

// interface for all the values & functions
interface IUseAppContext {
  student: GetStudentQuery | undefined;
  applications: Application[];
  haveActiveApplication: boolean;
}

// the default state for all the values & functions
const defaultState: IUseAppContext = {
  student: undefined,
  applications: [],
  haveActiveApplication: false,
};

// creating the app contexts
const AppContext = createContext<IUseAppContext>(defaultState);

// Access app values and functions with custom useAppContext hook
export const useAppContext = () => useContext(AppContext);

// The App provider to wrap the components that will use the context
export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useProviderApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

//NOTE: declare vars and functions here
function useProviderApp() {
  const { user } = useAuth();

  const [student, setStudent] = useState(defaultState.student);
  const [applications, setApplications] = useState<Application[]>(
    defaultState.applications
  );
  const [haveActiveApplication, setHaveActiveApplication] = useState(
    defaultState.haveActiveApplication
  );

  useEffect(() => {
    let cpr = user?.getUsername();
    if (cpr) {
      getStudentInfo(cpr).then((info) => {
        setStudent(info);
        console.log("user", info);
      });
      getStudentApplications(cpr).then((allStudentApplications) => {
        setApplications(allStudentApplications);

        /* Checking if the student has an active application. */
        let active = allStudentApplications.find(
          (application) =>
            application.status === Status.REVIEW ||
            application.status === Status.APPROVED ||
            application.status === Status.ELIGIBLE
        );
        setHaveActiveApplication(active !== undefined);
      });
    }

    return () => {};
  }, [user]);

  /**
   * It takes a CPR number as input, and returns the student's information
   * @param {string} cpr - The CPR number of the student you want to get information about.
   * @returns The student object
   */
  async function getStudentInfo(cpr: string) {
    let queryInput: GetStudentQueryVariables = {
      cpr: cpr,
    };

    let res = (await API.graphql({
      query: getStudent,
      variables: queryInput,
    })) as GraphQLResult<GetStudentQuery>;

    return res.data;
  }

  async function getStudentApplications(cpr: string): Promise<Application[]> {
    let q = `
    query GetAllApplicationsByCPR {
      applicationsByStudentCPRAndGpa(studentCPR: "${cpr}") {
        items {
          id
          _version
          _deleted
          gpa
          createdAt
          attachmentID
          applicationAttachmentId
          _lastChangedAt
          studentCPR
          status
          updatedAt
          attachment {
            id
            transcriptDoc
            signedContractDoc
            cprDoc
            acceptanceLetterDoc
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          programs {
            items {
              id
              choiceOrder
              program {
                id
                name
                requirements
                availability
                university {
                  id
                  name
                }
                _version
                _deleted
              }
              _version
              _deleted
            }
          }
          studentLogs {
            items {
              id
              dateTime
              studentCPR
              snapshot
              reason
              applicationStudentLogsId
              applicationID
              _version
            }
          }
        }
      }
    }`;

    let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;
    console.log("res", res);
    return (res.data?.applicationsByStudentCPRAndGpa?.items ??
      []) as Application[];
  }

  // NOTE: return all the values & functions you want to export
  return {
    student,
    applications,
    haveActiveApplication,
  };
}
