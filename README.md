# CHT-CONFIGS

In this mini-project, we built this application using JavaScript programming language and it leverages the CHT platform. It includes several components such as forms for data collection, tasks for follow-up actions, and targets for performance monitoring.

  ```sh
CHILDHEALTHTRACKER-Configs/
├── formReportUtils.js
├── forms/
│   ├── assessment.properties.json
│   ├── assessment.xlsx
│   ├── referral_follow_up.properties.json
│   └── referral_follow_up.xlsx
├── nools-extras.js
├── README.md
├── resources/
│   ├── icon-follow-up.png
│   └── icon-healthcare-assessment.png
├── resources.json
├── targets.js
├── targets-extras.js
├── tasks.js
└── test suite/
    ├── assessment_count_target.spec.js
    └── forms/
        └── referral_follow_up.spec.js
    ├── referral_rate_percent.spec.js

  ```

## Running the Test Suite

To run the test suite using the CHT CLI, follow the steps below:

1. Open the terminal.

2. Navigate to the root directory of your project where the test suite is located. In this case, the directory structure is as follows:
/home/gharris/Desktop/CHILDHEALTHTRACKER-Configs/test suite

3. Run the following command to navigate to the test suite directory:

```shell
cd /home/gharris/Desktop/CHILDHEALTHTRACKER-Configs/test suite
```

4. Once the CHT CLI is installed, run the test suite by executing the following command:
```shell
$ cht test assessment_count_target.spec.js referral_rate_percent.spec.js
```
This will execute the test suite and display the test results in the terminal.

Note: Make sure you have the necessary dependencies and configurations set up for the test suite to run successfully.



### Authors
George H. KYAMBADDE [![Twitter](https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/30px-Twitter_Bird.svg.png)](https://twitter.com/hk14_h)