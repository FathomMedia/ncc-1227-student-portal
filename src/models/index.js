// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "ELIGIBLE": "ELIGIBLE",
  "REVIEW": "REVIEW",
  "APPROVED": "APPROVED",
  "NOT_COMPLETED": "NOT_COMPLETED",
  "REJECTED": "REJECTED",
  "WITHDRAWN": "WITHDRAWN"
};

const Gender = {
  "FEMALE": "FEMALE",
  "MALE": "MALE"
};

const SchoolType = {
  "PRIVATE": "PRIVATE",
  "PUBLIC": "PUBLIC"
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
  SchoolType,
  Language
};