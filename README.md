# thesis-management-team17
Software Engineering II Project 2023-2024

# Thesis Management: requirements description

Date: 30/11/2023

Version for Demo 2

| Demo Version | Changes                                                                                                                                                                              |
| ------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Demo 1       | Implemented Search Proposals and SAML 2.0 authentication                                                                                                                             |
| Demo 2       | Implemented Insert Proposal, Apply for Proposal, Browse Applications, Accept Application, Browse Applications Decisions, Browse, Update, Delete, Archive Proposal and Search Archive |

## Contents

- [thesis-management-team17](#thesis-management-team17)
- [Thesis Management: requirements description](#thesis-management-requirements-description)
  - [Contents](#contents)
  - [Informal description](#informal-description)
  - [Stories](#stories)
  - [Use case diagram](#use-case-diagram)
  - [Users](#users)
    - [User Privileges](#user-privileges)
    - [Users Credentials](#users-credentials)
  - [General Information about the Project Management](#general-information-about-the-project-management)
    - [Authentication with SAML2.0](#authentication-with-saml20)
    - [Docker Implementation](#docker-implementation)
      - [Docker Pull and Run commands](#docker-pull-and-run-commands)
      - [Docker Ports](#docker-ports)
  - [API Specifications](#api-specifications)
    - [API List](#api-list)
      - [AuthenticationAPI.jsx](#authenticationapijsx)
        - [`getSessionAPI`](#getsessionapi)
        - [`logoutAPI`](#logoutapi)
      - [CoSupervisorAPI.jsx](#cosupervisorapijsx)
        - [`getCoSupList`](#getcosuplist)
      - [DegreeApi.jsx](#degreeapijsx)
        - [`getListCds`](#getlistcds)
      - [ProposalApi.jsx](#proposalapijsx)
        - [`newThesisProposal`](#newthesisproposal)
      - [ResearchGroupAPI.jsx](#researchgroupapijsx)
        - [`getAllGroups`](#getallgroups)
      - [SearchAPI.jsx](#searchapijsx)
        - [`getAllProposals`](#getallproposals)
        - [`searchProposals`](#searchproposals)
      - [TeacherAPI.jsx](#teacherapijsx)
        - [`getListTeacher`](#getlistteacher)
      - [TestAPI.jsx](#testapijsx)
        - [`getTest`](#gettest)
        - [`postTest`](#posttest)

## Informal description

The Thesis Management is a web application designed for the proper management of theses at PoliTo, providing the ability to propose and/or search for available thesis work, assign and organize theses, facilitate discussions about theses, and view details about the work. There are six user roles in the system: professor, student, co-supervisor, faculty director, president of the commission, and secretary clerk. After logging in, each user can perform several actions.

## Stories

| Issue-id |             Story             |                                                                                                                  Description |
| -------- | :---------------------------: | ---------------------------------------------------------------------------------------------------------------------------: |
| TM-1     |        Insert Proposal        |                                       As a **Professor** I wanto to insert a thesis proposal so that student can apply to it |
| TM-2     |       Search Proposals        |                        As a **Student** I want to search for thesis proposal so that i can find one that matches my interest |
| TM-3     |      Apply for Proposal       | As a **Student** I want to apply fot an existing thesis proposal so that the proposing professor can evaluate my application |
| TM-4     |      Browse Applications      |                            As a **Professor** I want to see the list of all applications so that I can accept or reject them |
| TM-5     |      Accept Application       |                                   As a **Professor** I want to accept or reject an application for existing thesis proposals |
| TM-6     | Browse Applications Decisions |                                                       As a **Student** I want to see the list of decisions on my application |
| TM-7     |       Browse Proposals        |                          As a **Professor** I want to view the list of active thesis proposals so that I can operate on them |
| TM-8     |        Update Proposal        |                                                                          As a **Professor** want to update a thesis proposal |
| TM-10    |        Delete Proposal        |                                                                        As a **Professor** I want to delete a thesis proposal |
| TM-12    |       Archive Proposal        |                                      As a **Professor** I want to archive a thesis proposals. So that I can later consult it |
| TM-16    |        Search Archive         |                                      As a **Professor** I want to archive a thesis proposals. So that I can later consult it |

## Use case diagram

<img src="images/UseCaseDiagram_Overview.PNG" width="600" height="550">

## Users 

| Role          | Actions                                                                                                                                                                                                                                                    |
| ------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Student**   | A generic Student can search for an existing thesis proposal, submit an application, and view the decision made by a professor regarding their application.                                                                                                |
| **Professor** | The primary actions a teacher can perform include inserting new thesis proposals and reviewing all active ones. Additionally, they can access a list of applications for existing thesis proposals and make decisions on whether to accept or reject them. |

### User Privileges
|    Story    | Student | Professor |
| :---------: | :-----: | :-------: |
| TM story 1  |         |     X     |
| TM story 2  |    X    |           |
| TM story 3  |    X    |           |
| TM story 4  |         |     X     |
| TM story 5  |         |     X     |
| TM story 6  |    X    |           |
| TM story 7  |         |     X     |
| TM story 8  |         |     X     |
| TM story 10 |         |     X     |
| TM story 12 |         |     X     |
| TM story 16 |         |     X     |

### Users Credentials

|           Email            | Password | Role          |
| :------------------------: | -------: | ------------- |
| s301316@studenti.polito.it |  s301316 | **Student**   |
| s308344@studenti.polito.it |  s308344 | **Student**   |
| s314140@studenti.polito.it |  s314140 | **Student**   |
| s317989@studenti.polito.it |  s317989 | **Student**   |
| s319572@studenti.polito.it |  s319572 | **Student**   |
| s319976@studenti.polito.it |  s319976 | **Student**   |
|      d12571@polito.it      |   d12571 | **Professor** |
|      d23817@polito.it      |   d23817 | **Professor** |
|      d54723@polito.it      |   d54723 | **Professor** |
|      d78912@polito.it      |   d78912 | **Professor** |
|      d96970@polito.it      |   d96970 | **Professor** |

## General Information about the Project Management 

### Authentication with SAML2.0

For the authentication we initially implemented **passport-auth0**, but encountered limitations as it only supports AUTH0 as an Identity Provider (IDP). 

To overcome this restriction and enhance compatibility with different IDPs available on the web, we decided to transition to **passport-saml**. This alternative solution enables us to configure and integrate with a broader range of web-based identity providers.

### Docker Implementation

Regarding Docker, you can download both the client and server images at: 

https://hub.docker.com/repository/docker/s317989/thesis-management-team17

#### Docker Pull and Run commands

To download the images and successfully run the project, please follow these steps:

- Create a directory and name it as desired --> ThesisManagementTeam17
- Copy the docker-compose.yml file and paste it into the newly created directory
- Run docker-compose up

After completing the above steps, wait a few seconds for everything to be executed successfully, and then you can open the client via localhost:5173.

#### Docker Ports
The **client** will be accessible on the following ports:
- Local: http://localhost:5173/
- Network: http://192.168.68.114:5173/

The **server** will be accessible on the port:
- Local: http://localhost:3000/ 

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