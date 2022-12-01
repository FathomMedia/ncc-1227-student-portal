/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttachment = /* GraphQL */ `
  subscription OnCreateAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onCreateAttachment(filter: $filter) {
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
export const onUpdateAttachment = /* GraphQL */ `
  subscription OnUpdateAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onUpdateAttachment(filter: $filter) {
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
export const onDeleteAttachment = /* GraphQL */ `
  subscription OnDeleteAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onDeleteAttachment(filter: $filter) {
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
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onCreateApplication(filter: $filter) {
      id
      gpa
      status
      attachmentID
      studentID
      adminLogs {
        items {
          id
          applicationID
          adminID
          dateTime
          snapshot
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAdminLogsId
          adminAdminLogsId
        }
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
        items {
          id
          programID
          applicationID
          choiceOrder
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationProgramsId
          programApplicationsId
        }
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
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onUpdateApplication(filter: $filter) {
      id
      gpa
      status
      attachmentID
      studentID
      adminLogs {
        items {
          id
          applicationID
          adminID
          dateTime
          snapshot
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAdminLogsId
          adminAdminLogsId
        }
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
        items {
          id
          programID
          applicationID
          choiceOrder
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationProgramsId
          programApplicationsId
        }
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
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onDeleteApplication(filter: $filter) {
      id
      gpa
      status
      attachmentID
      studentID
      adminLogs {
        items {
          id
          applicationID
          adminID
          dateTime
          snapshot
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAdminLogsId
          adminAdminLogsId
        }
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
        items {
          id
          programID
          applicationID
          choiceOrder
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationProgramsId
          programApplicationsId
        }
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
export const onCreateProgramChoice = /* GraphQL */ `
  subscription OnCreateProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onCreateProgramChoice(filter: $filter) {
      id
      programID
      applicationID
      program {
        id
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
      application {
        id
        gpa
        status
        attachmentID
        studentID
        adminLogs {
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
export const onUpdateProgramChoice = /* GraphQL */ `
  subscription OnUpdateProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onUpdateProgramChoice(filter: $filter) {
      id
      programID
      applicationID
      program {
        id
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
      application {
        id
        gpa
        status
        attachmentID
        studentID
        adminLogs {
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
export const onDeleteProgramChoice = /* GraphQL */ `
  subscription OnDeleteProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onDeleteProgramChoice(filter: $filter) {
      id
      programID
      applicationID
      program {
        id
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
      application {
        id
        gpa
        status
        attachmentID
        studentID
        adminLogs {
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
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onCreateProgram(filter: $filter) {
      id
      requirements
      availability
      universityID
      university {
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
      applications {
        items {
          id
          programID
          applicationID
          choiceOrder
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationProgramsId
          programApplicationsId
        }
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
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onUpdateProgram(filter: $filter) {
      id
      requirements
      availability
      universityID
      university {
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
      applications {
        items {
          id
          programID
          applicationID
          choiceOrder
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationProgramsId
          programApplicationsId
        }
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
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram($filter: ModelSubscriptionProgramFilterInput) {
    onDeleteProgram(filter: $filter) {
      id
      requirements
      availability
      universityID
      university {
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
      applications {
        items {
          id
          programID
          applicationID
          choiceOrder
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationProgramsId
          programApplicationsId
        }
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
export const onCreateUniversity = /* GraphQL */ `
  subscription OnCreateUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onCreateUniversity(filter: $filter) {
      id
      name
      Programs {
        items {
          id
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
export const onUpdateUniversity = /* GraphQL */ `
  subscription OnUpdateUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onUpdateUniversity(filter: $filter) {
      id
      name
      Programs {
        items {
          id
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
export const onDeleteUniversity = /* GraphQL */ `
  subscription OnDeleteUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onDeleteUniversity(filter: $filter) {
      id
      name
      Programs {
        items {
          id
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
export const onCreateAdminLog = /* GraphQL */ `
  subscription OnCreateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
    onCreateAdminLog(filter: $filter) {
      id
      applicationID
      adminID
      dateTime
      snapshot
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsId
    }
  }
`;
export const onUpdateAdminLog = /* GraphQL */ `
  subscription OnUpdateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
    onUpdateAdminLog(filter: $filter) {
      id
      applicationID
      adminID
      dateTime
      snapshot
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsId
    }
  }
`;
export const onDeleteAdminLog = /* GraphQL */ `
  subscription OnDeleteAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
    onDeleteAdminLog(filter: $filter) {
      id
      applicationID
      adminID
      dateTime
      snapshot
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsId
    }
  }
`;
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onCreateAdmin(filter: $filter) {
      id
      cpr
      fullName
      email
      AdminLogs {
        items {
          id
          applicationID
          adminID
          dateTime
          snapshot
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAdminLogsId
          adminAdminLogsId
        }
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
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onUpdateAdmin(filter: $filter) {
      id
      cpr
      fullName
      email
      AdminLogs {
        items {
          id
          applicationID
          adminID
          dateTime
          snapshot
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAdminLogsId
          adminAdminLogsId
        }
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
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onDeleteAdmin(filter: $filter) {
      id
      cpr
      fullName
      email
      AdminLogs {
        items {
          id
          applicationID
          adminID
          dateTime
          snapshot
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAdminLogsId
          adminAdminLogsId
        }
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
export const onCreateParentInfo = /* GraphQL */ `
  subscription OnCreateParentInfo(
    $filter: ModelSubscriptionParentInfoFilterInput
  ) {
    onCreateParentInfo(filter: $filter) {
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
      Address {
        id
        type
        buildingNumber
        roadNumber
        blockNumber
        city
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      parentInfoAddressId
    }
  }
`;
export const onUpdateParentInfo = /* GraphQL */ `
  subscription OnUpdateParentInfo(
    $filter: ModelSubscriptionParentInfoFilterInput
  ) {
    onUpdateParentInfo(filter: $filter) {
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
      Address {
        id
        type
        buildingNumber
        roadNumber
        blockNumber
        city
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      parentInfoAddressId
    }
  }
`;
export const onDeleteParentInfo = /* GraphQL */ `
  subscription OnDeleteParentInfo(
    $filter: ModelSubscriptionParentInfoFilterInput
  ) {
    onDeleteParentInfo(filter: $filter) {
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
      Address {
        id
        type
        buildingNumber
        roadNumber
        blockNumber
        city
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      parentInfoAddressId
    }
  }
`;
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
      id
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
      addressID
      preferredLanguage
      graduationDate
      Address {
        id
        type
        buildingNumber
        roadNumber
        blockNumber
        city
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        Address {
          id
          type
          buildingNumber
          roadNumber
          blockNumber
          city
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        parentInfoAddressId
      }
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentAddressId
      studentParentInfoId
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
      id
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
      addressID
      preferredLanguage
      graduationDate
      Address {
        id
        type
        buildingNumber
        roadNumber
        blockNumber
        city
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        Address {
          id
          type
          buildingNumber
          roadNumber
          blockNumber
          city
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        parentInfoAddressId
      }
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentAddressId
      studentParentInfoId
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
      id
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
      addressID
      preferredLanguage
      graduationDate
      Address {
        id
        type
        buildingNumber
        roadNumber
        blockNumber
        city
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        Address {
          id
          type
          buildingNumber
          roadNumber
          blockNumber
          city
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        parentInfoAddressId
      }
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentAddressId
      studentParentInfoId
    }
  }
`;
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onCreateAddress(filter: $filter) {
      id
      type
      buildingNumber
      roadNumber
      blockNumber
      city
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onUpdateAddress(filter: $filter) {
      id
      type
      buildingNumber
      roadNumber
      blockNumber
      city
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
    onDeleteAddress(filter: $filter) {
      id
      type
      buildingNumber
      roadNumber
      blockNumber
      city
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
