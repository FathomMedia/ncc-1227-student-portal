/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAttachment = /* GraphQL */ `
  mutation CreateAttachment(
    $input: CreateAttachmentInput!
    $condition: ModelAttachmentConditionInput
  ) {
    createAttachment(input: $input, condition: $condition) {
      id
      cprDoc
      acceptanceLetterDoc
      transcriptDoc
      signedContractDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAttachment = /* GraphQL */ `
  mutation UpdateAttachment(
    $input: UpdateAttachmentInput!
    $condition: ModelAttachmentConditionInput
  ) {
    updateAttachment(input: $input, condition: $condition) {
      id
      cprDoc
      acceptanceLetterDoc
      transcriptDoc
      signedContractDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAttachment = /* GraphQL */ `
  mutation DeleteAttachment(
    $input: DeleteAttachmentInput!
    $condition: ModelAttachmentConditionInput
  ) {
    deleteAttachment(input: $input, condition: $condition) {
      id
      cprDoc
      acceptanceLetterDoc
      transcriptDoc
      signedContractDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
      id
      gpa
      status
      attachmentID
      studentCPR
      adminLogs {
        nextToken
        startedAt
      }
      studentLogs {
        nextToken
        startedAt
      }
      attachment {
        id
        cprDoc
        acceptanceLetterDoc
        transcriptDoc
        signedContractDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      programs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
    }
  }
`;
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
      id
      gpa
      status
      attachmentID
      studentCPR
      adminLogs {
        nextToken
        startedAt
      }
      studentLogs {
        nextToken
        startedAt
      }
      attachment {
        id
        cprDoc
        acceptanceLetterDoc
        transcriptDoc
        signedContractDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      programs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
    }
  }
`;
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
      id
      gpa
      status
      attachmentID
      studentCPR
      adminLogs {
        nextToken
        startedAt
      }
      studentLogs {
        nextToken
        startedAt
      }
      attachment {
        id
        cprDoc
        acceptanceLetterDoc
        transcriptDoc
        signedContractDoc
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      programs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
    }
  }
`;
export const createProgramChoice = /* GraphQL */ `
  mutation CreateProgramChoice(
    $input: CreateProgramChoiceInput!
    $condition: ModelProgramChoiceConditionInput
  ) {
    createProgramChoice(input: $input, condition: $condition) {
      id
      programID
      applicationID
      program {
        id
        name
        requirements
        availability
        universityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        status
        attachmentID
        studentCPR
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAttachmentId
      }
      choiceOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationProgramsId
      programApplicationsId
    }
  }
`;
export const updateProgramChoice = /* GraphQL */ `
  mutation UpdateProgramChoice(
    $input: UpdateProgramChoiceInput!
    $condition: ModelProgramChoiceConditionInput
  ) {
    updateProgramChoice(input: $input, condition: $condition) {
      id
      programID
      applicationID
      program {
        id
        name
        requirements
        availability
        universityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        status
        attachmentID
        studentCPR
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAttachmentId
      }
      choiceOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationProgramsId
      programApplicationsId
    }
  }
`;
export const deleteProgramChoice = /* GraphQL */ `
  mutation DeleteProgramChoice(
    $input: DeleteProgramChoiceInput!
    $condition: ModelProgramChoiceConditionInput
  ) {
    deleteProgramChoice(input: $input, condition: $condition) {
      id
      programID
      applicationID
      program {
        id
        name
        requirements
        availability
        universityID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        status
        attachmentID
        studentCPR
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAttachmentId
      }
      choiceOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationProgramsId
      programApplicationsId
    }
  }
`;
export const createProgram = /* GraphQL */ `
  mutation CreateProgram(
    $input: CreateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    createProgram(input: $input, condition: $condition) {
      id
      name
      requirements
      availability
      universityID
      university {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const updateProgram = /* GraphQL */ `
  mutation UpdateProgram(
    $input: UpdateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    updateProgram(input: $input, condition: $condition) {
      id
      name
      requirements
      availability
      universityID
      university {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const deleteProgram = /* GraphQL */ `
  mutation DeleteProgram(
    $input: DeleteProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    deleteProgram(input: $input, condition: $condition) {
      id
      name
      requirements
      availability
      universityID
      university {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const createUniversity = /* GraphQL */ `
  mutation CreateUniversity(
    $input: CreateUniversityInput!
    $condition: ModelUniversityConditionInput
  ) {
    createUniversity(input: $input, condition: $condition) {
      id
      name
      Programs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUniversity = /* GraphQL */ `
  mutation UpdateUniversity(
    $input: UpdateUniversityInput!
    $condition: ModelUniversityConditionInput
  ) {
    updateUniversity(input: $input, condition: $condition) {
      id
      name
      Programs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUniversity = /* GraphQL */ `
  mutation DeleteUniversity(
    $input: DeleteUniversityInput!
    $condition: ModelUniversityConditionInput
  ) {
    deleteUniversity(input: $input, condition: $condition) {
      id
      name
      Programs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createAdminLog = /* GraphQL */ `
  mutation CreateAdminLog(
    $input: CreateAdminLogInput!
    $condition: ModelAdminLogConditionInput
  ) {
    createAdminLog(input: $input, condition: $condition) {
      id
      applicationID
      adminCPR
      dateTime
      snapshot
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const updateAdminLog = /* GraphQL */ `
  mutation UpdateAdminLog(
    $input: UpdateAdminLogInput!
    $condition: ModelAdminLogConditionInput
  ) {
    updateAdminLog(input: $input, condition: $condition) {
      id
      applicationID
      adminCPR
      dateTime
      snapshot
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const deleteAdminLog = /* GraphQL */ `
  mutation DeleteAdminLog(
    $input: DeleteAdminLogInput!
    $condition: ModelAdminLogConditionInput
  ) {
    deleteAdminLog(input: $input, condition: $condition) {
      id
      applicationID
      adminCPR
      dateTime
      snapshot
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const createStudentLog = /* GraphQL */ `
  mutation CreateStudentLog(
    $input: CreateStudentLogInput!
    $condition: ModelStudentLogConditionInput
  ) {
    createStudentLog(input: $input, condition: $condition) {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
    }
  }
`;
export const updateStudentLog = /* GraphQL */ `
  mutation UpdateStudentLog(
    $input: UpdateStudentLogInput!
    $condition: ModelStudentLogConditionInput
  ) {
    updateStudentLog(input: $input, condition: $condition) {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
    }
  }
`;
export const deleteStudentLog = /* GraphQL */ `
  mutation DeleteStudentLog(
    $input: DeleteStudentLogInput!
    $condition: ModelStudentLogConditionInput
  ) {
    deleteStudentLog(input: $input, condition: $condition) {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
    }
  }
`;
export const createAdmin = /* GraphQL */ `
  mutation CreateAdmin(
    $input: CreateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    createAdmin(input: $input, condition: $condition) {
      cpr
      fullName
      email
      AdminLogs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAdmin = /* GraphQL */ `
  mutation UpdateAdmin(
    $input: UpdateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    updateAdmin(input: $input, condition: $condition) {
      cpr
      fullName
      email
      AdminLogs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAdmin = /* GraphQL */ `
  mutation DeleteAdmin(
    $input: DeleteAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    deleteAdmin(input: $input, condition: $condition) {
      cpr
      fullName
      email
      AdminLogs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createParentInfo = /* GraphQL */ `
  mutation CreateParentInfo(
    $input: CreateParentInfoInput!
    $condition: ModelParentInfoConditionInput
  ) {
    createParentInfo(input: $input, condition: $condition) {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateParentInfo = /* GraphQL */ `
  mutation UpdateParentInfo(
    $input: UpdateParentInfoInput!
    $condition: ModelParentInfoConditionInput
  ) {
    updateParentInfo(input: $input, condition: $condition) {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteParentInfo = /* GraphQL */ `
  mutation DeleteParentInfo(
    $input: DeleteParentInfoInput!
    $condition: ModelParentInfoConditionInput
  ) {
    deleteParentInfo(input: $input, condition: $condition) {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      cpr
      fullName
      email
      phone
      gender
      schoolName
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      preferredLanguage
      graduationDate
      address
      applications {
        nextToken
        startedAt
      }
      ParentInfo {
        id
        guardianFullName
        relation
        guardianCPR
        primaryMobile
        secondaryMobile
        fatherFullName
        fatherCPR
        motherFullName
        motherCPR
        numberOfFamilyMembers
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      cpr
      fullName
      email
      phone
      gender
      schoolName
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      preferredLanguage
      graduationDate
      address
      applications {
        nextToken
        startedAt
      }
      ParentInfo {
        id
        guardianFullName
        relation
        guardianCPR
        primaryMobile
        secondaryMobile
        fatherFullName
        fatherCPR
        motherFullName
        motherCPR
        numberOfFamilyMembers
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      cpr
      fullName
      email
      phone
      gender
      schoolName
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      preferredLanguage
      graduationDate
      address
      applications {
        nextToken
        startedAt
      }
      ParentInfo {
        id
        guardianFullName
        relation
        guardianCPR
        primaryMobile
        secondaryMobile
        fatherFullName
        fatherCPR
        motherFullName
        motherCPR
        numberOfFamilyMembers
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
