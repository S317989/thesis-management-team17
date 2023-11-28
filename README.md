# thesis-management-team17
Software Engineering II Project 2023-2024

# Thesis Management: requirements description

Date: 30/11/2023

Version for Demo 2

| Demo Version   | Changes                                              |
| -------------- | :--------------------------------------------------- |
| Demo 1         | Implemented Search Proposals and SAML 2.0 authentication |
| Demo 2         | Implemented Insert Proposal, Apply for Proposal, Browse Applications, Accept Application, Browse Applications Decisions |

## Contents

- [Informal description](#informal-description)
- [Stories](#stories)
- [Use case diagram](#use-case-diagram)
- [Users](#users)
- [Authentication with SAML](#authentication-with-saml)
- [API Specification](#api-specifications)
  - [API List](#api-list)
    - [AuthenticationAPI.jsx](#authenticationApijsx)
      - [getSessionAPI](#getsessionapi)
      - [login](#login)
      - [logoutAPI](#logoutapi)
    - [CoSupervisorAPI.jsx](#cosupervisorApijsx)
      - [getCoSupList](#getcosuplist)
    - [DegreeApi.jsx](#degreeApijsx)
      - [getListCds](#getlistcds)
    - [ProposalApi.jsx](#proposalApijsx)
      - [newThesisProposal](#newthesisproposal)
    - [ResearchGroupAPI.jsx](#researchgroupApijsx)
      - [getAllGroups](#getallgroups)
    - [SearchAPI.jsx](#searchApijsx)
      - [getAllProposals](#getallproposals)
      - [searchProposals](#searchproposals)
    - [TeacherAPI.jsx](#teacherApijsx)
      - [getListTeacher](#getlistteacher)
    - [TestAPI.jsx](#testApijsx)
      - [getTest](#gettest)
      - [postTest](#posttest)

## Informal description

The Thesis Management is a web application designed for the proper management of theses at PoliTo, providing the ability to propose and/or search for available thesis work, assign and organize theses, facilitate discussions about theses, and view details about the work. There are six user roles in the system: professor, student, co-supervisor, faculty director, president of the commission, and secretary clerk. After logging in, each user can perform several actions.

## Stories

| Issue-id            | Story                         | Description                                   |
| ------------------- | :---------------------------: | -------------------------------------------------: |
| TM-1                | Insert Proposal               | As a **Professor** I wanto to insert a thesis proposal so that student can apply to it  |
| TM-2                | Search Proposals              | As a **Student** I want to search for thesis proposal so that i can find one that matches my interest   |
| TM-3                | Apply for Proposal            | As a **Student** I want to apply fot an existing thesis proposal so that the proposing professor can evaluate my application    |
| TM-4                | Browse Applications           | As a **Professor** I want to see the list of all applications so that I can accept or reject them   |
| TM-5                | Accept Application            | As a **Professor** I want to accept or reject an application for existing thesis proposals  |
| TM-6                | Browse Applications Decisions | As a **Student** I want to see the list of decisions on my application  |
| TM-7                | Browse Proposals              | As a **Professor** I want to view the list of active thesis proposals so that I can operate on them     |


## Use case diagram

<img src="images/UseCaseDiagram_Overview.PNG" width="600" height="550">

## Users 

| Role           | Actions                                                    |
| -------------- | :--------------------------------------------------------- |
|  **Student**   | A generic Student can search for an existing thesis proposal, submit an application, and view the decision made by a professor regarding their application. |
|  **Professor** | The primary actions a teacher can perform include inserting new thesis proposals and reviewing all active ones. Additionally, they can access a list of applications for existing thesis proposals and make decisions on whether to accept or reject them. |

### Authentication with SAML

For the authentication we initially implemented passport-auth0, but encountered limitations as it only supports AUTH0 as an Identity Provider (IDP). To overcome this restriction and enhance compatibility with different IDPs available on the web, we decided to transition to passport-saml. This alternative solution enables us to configure and integrate with a broader range of web-based identity providers.

| Role            | Email                         | Password |
| --------------- | :---------------------------: | -------: |
| **Student**     | s301316@studenti.polito.it    | s301316  |
| **Student**     | s308344@studenti.polito.it    | s308344  |
| **Student**     | s314140@studenti.polito.it    | s314140  |
| **Student**     | s317989@studenti.polito.it    | s317989  |
| **Student**     | s319572@studenti.polito.it    | s319572  |
| **Student**     | s319976@studenti.polito.it    | s319976  |
| **Professor**   | d12571@polito.it              | d12571   |
| **Professor**   | d23817@polito.it              | d23817   |
| **Professor**   | d54723@polito.it              | d54723   |
| **Professor**   | d78912@polito.it              | d78912   |
| **Professor**   | d96970@polito.it              | d96970   |

## API Specifications

This part of the document lists all the expected behaviors for the APIs that compose the Thesis Management application.

### API List

#### AuthenticationAPI.jsx

##### `getSessionAPI`

- Request Parameters: None
- URL: http://localhost:3000/api/auth/session
- Method: GET
- Body content: none
- Returns a 401 error with an error message "Unauthorized" if the user role is not a **student** or a **professor**

##### `logoutAPI`

- Request Parameters: None
- URL: http://localhost:3000/api/auth/logout
- Method: DELETE
- Body content: none
- Returns a 401 error with an error message "Unauthorized" if not performed correctly

#### CoSupervisorAPI.jsx

##### `getCoSupList`

- Request Parameters: None
- URL: http://localhost:3000/api/cosupervisor/get-all
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

#### DegreeApi.jsx

##### `getListCds`

- Request Parameters: None
- URL: http://localhost:3000/api/degree/get-all
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

#### ProposalApi.jsx

##### `newThesisProposal`

- Request Parameters: None
- URL: http://localhost:3000/api/thesis/newproposal
- Method: POST
- Body content: `title`, `supervisor`, `cosup`, `groups`, `keywords`, `type`, `description`, `knowledge`, `notes`, `expiration`, `level`, `cds`
- Returns an error message status if not performed correctly

#### ResearchGroupAPI.jsx

##### `getAllGroups`

- Request Parameters: None
- URL: http://localhost:3000/api/groups/get-all
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

#### SearchAPI.jsx

##### `getAllProposals`

- Request Parameters: `userId`
- URL: http://localhost:3000/api/proposals/retrieve-all/`userId`
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

##### `searchProposals`

- Request Parameters: `userId`, `searchTerm`
- URL: http://localhost:3000/api/proposals/search/`userId`/`searchTerm`
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

#### TeacherAPI.jsx

##### `getListTeacher`

- Request Parameters: None
- URL: http://localhost:3000/api/teacher/get-all
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

#### TestAPI.jsx

##### `getTest`

- Request Parameters: None
- URL: http://localhost:3000/api/test
- Method: GET
- Body content: none
- Returns an error message status if not performed correctly

##### `postTest`

- Request Parameters: None
- URL: http://localhost:3000/api/test
- Method: POST
- Body content: none
- Returns an error message status if not performed correctly

