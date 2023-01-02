// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "APPROVED": "APPROVED",
  "REJECTED": "REJECTED",
  "REVIEW": "REVIEW",
  "WITHDRAWN": "WITHDRAWN",
  "ELIGIBLE": "ELIGIBLE",
  "NOT_COMPLETED": "NOT_COMPLETED"
};

const Gender = {
  "FEMALE": "FEMALE",
  "MALE": "MALE"
};

const Language = {
  "ARABIC": "ARABIC",
  "ENGLISH": "ENGLISH"
};

const { Attachment, Application, AdminLog, Admin, StudentLog, Student, ParentInfo, ProgramChoice, Program, University } = initSchema(schema);

export {
  Attachment,
  Application,
  AdminLog,
  Admin,
  StudentLog,
  Student,
  ParentInfo,
  ProgramChoice,
  Program,
  University,
  Status,
  Gender,
  Language
};