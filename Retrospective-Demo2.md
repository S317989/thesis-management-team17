RETROSPECTIVE FOR DEMO 2 (Team 17)
=====================================

Sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 10 stories committed | 10 stories done 
- 18 points committed | 16 points done 
- 96h | 78h spent (as a team)

 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   | DB final fixes |        |    3h        |        3h      |
| _#0_   | YouTrack management  |        |    1h        |      1h        |
| _#0_   | E2E testing preparation |        |    1h        |        1h      |
| _#0_   | Virtual clock Frontend |        |    1h        |        1h      |
| _#0_   | Docker management learning |        |    3h        |        3h      |
| _#0_   | Docker management development |        |    3h        |        2h      |
| _#0_   | Docker uploading test and final |        |    3h        |        2h      |
| _#0_   | SAML fix |        |    3h        |        2h      |
| _#0_   | Documentation management |        |    8h        |        10h      |
| _#0_   | SonarCloud Learning |        |    2h        |        2h      |
| _#0_   | Presentation |        |    2h        |       3h      |
| _#0_   | Virtual clock Learning |        |    3h        |        3h      |
| _#0_   | Virtual clock management |        |    3h        |        3h      |
| _#0_   | Code Merge |        |    1h        |        0.5h      |
| _#0_   | Learning unit test |        |    1h        |        5h      |
| _#0_   | Graphic fix |        |    2h        |        2h      |
| n 1    | Insert Proposal fix |    2    |      4h      |       4h       |
| n 4    | Browse Applications test front-end |   1     |      0.5h      |       2.5h       |
| n 5    | Accept Applications front-end |   2     |      1h      |       0.5h       |
| n 5    | Accept Applications back-end |    2    |      3h      |       1h       |
| n 6    | Browse Application decisions front-end |    1    |      3h      |       3.5h       |
| n 6    | Browse Application decisions test front-end |    1    |      0.5h      |       0.5h       |
| n 6    | Browse Application decisions back-end |    1    |      2h      |       2h       |
| n 7    | Browse Proposal front-end |    1    |      2h      |       6h       |
| n 7    | Browse Proposal back-end |    1    |      3h      |       3h       |
| n 8    | Update Proposal front-end |   2     |      2h      |       2h       |
| n 8    | Update Proposal back-end |    2    |      3h      |       3h       |
| n 10   | Delete Proposal front-end |    2    |      0.5h      |       0.5h       |
| n 10   | Delete Proposal back-end |    2    |      1h      |       1h       |
| n 12   | Archive Proposal front-end |    2    |      1h      |       1h       |
| n 12   | Archive Proposal back-end |    2    |      2h      |       2h       |
| n 16   | Search Archive front-end |    1    |      0.5h      |       0.5h       |
| n 16   | Search Archive back-end |    1    |      1h      |       1h       |

- Hours per task average, standard deviation (estimate and actual)

  - Hours per Task Average and Standard Deviation:

    - For **Estimated** Hours:
      Story #0:
      - Average: 2.66 hours
      - Standard Deviation: 1.5 hours
      Story n 1:
      - Average: 4 hours
      - Standard Deviation: 1 hour 
      Story n 4:
      - Average: 0.5 hours
      - Standard Deviation: 0.75 hours 
      Story n 5:
      - Average: 2 hours
      - Standard Deviation: 1.25 hours 
      Story n 6:
      - Average: 1.83 hours
      - Standard Deviation: 1.8 hours 
      Story n 7:
      - Average: 2.5 hours
      - Standard Deviation: 0.9 hours 
      Story n 8:
      - Average: 2.5 hours
      - Standard Deviation: 1 hour 
      Story n 10:
      - Average: 0.75 hours
      - Standard Deviation: 0.6 hours 
      Story n 12:
      - Average: 1.5 hours
      - Standard Deviation: 0.7 hours 
      Story n 16:
      - Average: 0.75 hours
      - Standard Deviation: 0.8 hours 

    - For **Actual** Hours:
      Story #0:
      - Average: 4.26 hours
      - Standard Deviation: 1.75 hours 
      Story n 1:
      - Average: 4 hours
      - Standard Deviation: 1 hour 
      Story n 4:
      - Average: 2.5 hours
      - Standard Deviation: 0.5 hours 
      Story n 5:
      - Average: 0.75 hours
      - Standard Deviation: 0.75 hours 
      Story n 6:
      - Average: 2.33 hours
      - Standard Deviation: 1.2 hours 
      Story n 7:
      - Average: 4.5 hours
      - Standard Deviation: 0.9 hours 
      Story n 8:
      - Average: 2.5 hours
      - Standard Deviation: 1 hour 
      Story n 10:
      - Average: 0.75 hours
      - Standard Deviation: 0.6 hours 
      Story n 12:
      - Average: 1.5 hours
      - Standard Deviation: 0.7 hours 
      Story n 16:
      - Average: 0.75 hours
      - Standard Deviation: 0.8 hours 

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 --> 70/78 - 1 = -0.103


## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated --> 6h
  - Total hours spent --> 10h
- E2E testing:
  - Total hours estimated --> 4h
  - Total hours spent --> 4h
- Code review 
  - Total hours estimated --> 8h
  - Total hours spent --> 6h
  

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - The primary issues were about the estimated time for organizing the front-end part and also to configure the SAML authentication because we encountered limitations as it only supports AUTH0 as an Identity Provider (IDP).
  - Other minor challenges involved gaining familiarity with certain technologies, such as the Virtual Clock and achieving an average experience with certain tools related to testing (both unit and E2E testing).

- What lessons did you learn (both positive and negative) in this sprint?

  > positive
  - We learned how to split tasks among the different members of the group and how to communicate more efficiently and effectively.

  > negative
  - We underestimated the difficulties and overall effort required when assigning only one team member to handle the development of the front-end part. 

- Which improvement goals set in the previous retrospective were you able to achieve? 
  
  - The main goal we set in the previous sprint was to improve our internal communication, coordination and overall team engagement and we were able to achieve it.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - We need to prioritize enhancing the responsiveness of the Thesis Management application to ensure its usability on various devices, including smartphones and tablets. 

- One thing you are proud of as a Team!!

  - We are proud that we were able to overcome the initial difficulties and to set a positive environment for every team member in which everyone could work in the best and most effective way. 