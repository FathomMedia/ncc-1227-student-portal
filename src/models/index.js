// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "APPROVED": "APPROVED",
  "REJECTED": "REJECTED",
  "CANCELED": "CANCELED",
  "REVIEW": "REVIEW",
  "WITHDRAWN": "WITHDRAWN",
  "ELIGIBLE": "ELIGIBLE"
};

const Language = {
  "ARABIC": "ARABIC",
  "ENGLISH": "ENGLISH"
};

const Gender = {
  "FEMALE": "FEMALE",
  "MALE": "MALE"
};

const { Attachment, Application, AdminLog, StudentLog, ProgramChoice, Program, University, Admin, ParentInfo, Student } = initSchema(schema);

export {
  Attachment,
  Application,
  AdminLog,
  StudentLog,
  ProgramChoice,
  Program,
  University,
  Admin,
  ParentInfo,
  Student,
  Status,
  Language,
  Gender
};