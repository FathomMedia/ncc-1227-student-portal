/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttachment = /* GraphQL */ `
  query GetAttachment($id: ID!) {
    getAttachment(id: $id) {
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
export const listAttachments = /* GraphQL */ `
  query ListAttachments(
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttachments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAttachments = /* GraphQL */ `
  query SyncAttachments(
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttachments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
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
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncApplications = /* GraphQL */ `
  query SyncApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getProgramChoice = /* GraphQL */ `
  query GetProgramChoice($id: ID!) {
    getProgramChoice(id: $id) {
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
export const listProgramChoices = /* GraphQL */ `
  query ListProgramChoices(
    $filter: ModelProgramChoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgramChoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        programID
        applicationID
        program {
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
        application {
          id
          gpa
          status
          attachmentID
          studentID
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
      nextToken
      startedAt
    }
  }
`;
export const syncProgramChoices = /* GraphQL */ `
  query SyncProgramChoices(
    $filter: ModelProgramChoiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProgramChoices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        programID
        applicationID
        program {
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
        application {
          id
          gpa
          status
          attachmentID
          studentID
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
      nextToken
      startedAt
    }
  }
`;
export const getProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
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
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPrograms = /* GraphQL */ `
  query SyncPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPrograms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUniversity = /* GraphQL */ `
  query GetUniversity($id: ID!) {
    getUniversity(id: $id) {
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
export const listUniversities = /* GraphQL */ `
  query ListUniversities(
    $filter: ModelUniversityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUniversities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUniversities = /* GraphQL */ `
  query SyncUniversities(
    $filter: ModelUniversityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUniversities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getAdminLog = /* GraphQL */ `
  query GetAdminLog($id: ID!) {
    getAdminLog(id: $id) {
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
export const listAdminLogs = /* GraphQL */ `
  query ListAdminLogs(
    $filter: ModelAdminLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncAdminLogs = /* GraphQL */ `
  query SyncAdminLogs(
    $filter: ModelAdminLogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdminLogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getAdmin = /* GraphQL */ `
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
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
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
      nextToken
      startedAt
    }
  }
`;
export const syncAdmins = /* GraphQL */ `
  query SyncAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdmins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
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
      nextToken
      startedAt
    }
  }
`;
export const getParentInfo = /* GraphQL */ `
  query GetParentInfo($id: ID!) {
    getParentInfo(id: $id) {
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
export const listParentInfos = /* GraphQL */ `
  query ListParentInfos(
    $filter: ModelParentInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParentInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncParentInfos = /* GraphQL */ `
  query SyncParentInfos(
    $filter: ModelParentInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncParentInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncStudents = /* GraphQL */ `
  query SyncStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStudents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAddresses = /* GraphQL */ `
  query SyncAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAddresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
