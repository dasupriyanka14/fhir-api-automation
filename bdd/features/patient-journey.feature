@smoke @patient
Feature: Patient journey in FHIR system

  Scenario: Create patient and verify lifecycle
    Given I create a new patient
    When I read the patient
    Then patient details should be returned
