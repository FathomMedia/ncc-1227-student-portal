// use-auth.ts

import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
  FC,
} from "react";
import { Auth, CognitoUser } from "@aws-amplify/auth";
import config from "../src/aws-exports";
import { toast } from "react-hot-toast";
import { API } from "aws-amplify";
import { GetStudentQuery, GetStudentQueryVariables } from "../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useRouter } from "next/router";
import { getStudent } from "../src/graphql/queries";

Auth.configure({ ...config, ssr: true });

interface IUseAuthContext {
  user: CognitoUser | undefined;
  isSignedIn: boolean;
  signIn: (cpr: string, password: string) => Promise<CognitoUser | undefined>;
  signOut: () => Promise<void>;
  checkIfCprExist: (cpr: string) => Promise<boolean>;
}

const defaultState: IUseAuthContext = {
  user: undefined,
  isSignedIn: false,
  signIn: async () => undefined,
  signOut: async () => {},
  checkIfCprExist: async () => false,
};

const AuthContext = createContext<IUseAuthContext>(defaultState);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Access auth values and functions with custom useAuth hook
export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState<CognitoUser | undefined>(defaultState.user);
  const [isSignedIn, setIsSignedIn] = useState(defaultState.isSignedIn);

  const { push } = useRouter();

  useEffect(() => {
    // NOTE: check for user or risk an infinite loop
    if (!user) {
      // On component mount
      // If a user cookie exists
      // reset the user to it
      getAuthUser();
    }
  }, [user]);

  /**
   * It checks if a CPR number is already in use by a student
   * @param {string} cpr - string - The CPR number of the student
   * @returns A boolean value.
   */
  async function checkIfCprExist(cpr: string): Promise<boolean> {
    let queryInput: GetStudentQueryVariables = {
      cpr: cpr,
    };

    let res = (await API.graphql({
      query: getStudent,
      variables: queryInput,
    })) as GraphQLResult<GetStudentQuery>;

    return res.data?.getStudent != null;
  }

  /**
   * It checks if the user is signed in, and if so, it sets the user state to the user object returned by
   * the Auth.currentAuthenticatedUser() method
   */
  async function getAuthUser(): Promise<void> {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setIsSignedIn(true);
      setUser(authUser);
    } catch (error) {
      setIsSignedIn(false);
      setUser(undefined);
    }
  }

  /**
   * It signs in a user with the given credentials.
   * @param {string} cpr - string, password: string
   * @param {string} password - string - The password of the user
   */
  const signIn = (
    cpr: string,
    password: string
  ): Promise<CognitoUser | undefined> =>
    toast.promise(
      checkIfCprExist(cpr).then(async (cprExist) => {
        if (cprExist) {
          const cognitoUser = await Auth.signIn(cpr, password).catch(
            (error) => {
              console.log(error);

              if (error.name === "UserNotConfirmedException") {
                push({ pathname: "/signUp", query: { cpr: cpr } });
              }
              throw error;
            }
          );
          setIsSignedIn(true);
          setUser(cognitoUser);
          return cognitoUser;
        } else {
          throw new Error("CPR does not exist");
        }
      }),
      {
        loading: "Signing in...",
        success: (authUser) => {
          return `${authUser?.getUsername()} Successfully signed in`;
        },
        error: (error) => {
          return `${error?.message}`;
        },
      }
    );

  /**
   * It signs out the user.
   */
  const signOut = (): Promise<void> =>
    toast.promise(
      Auth.signOut().then(() => {
        setIsSignedIn(false);
        setUser(undefined);
      }),
      {
        loading: "Signing Out...",
        success: "Signed out",
        error: (error) => {
          return `${error?.message}`;
        },
      }
    );

  return {
    user,
    isSignedIn,
    signIn,
    signOut,
    checkIfCprExist,
  };
}
