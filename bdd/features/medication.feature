@regression @medication
Feature: Medication request flow

  Scenario: Create medication for patient
    Given I create a patient
    When I request medication
    Then medication should be created successfully