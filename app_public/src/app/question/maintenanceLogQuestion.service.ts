import { Injectable } from '@angular/core';

import { DropdownQuestion } from './questionDropdown';
import { QuestionBase } from './questionBase';
import { TextboxQuestion } from './questionTextbox';
import { GroupLabelQuestion } from './questionGroupLabel';
import { GateService } from '../_services/gate.service';
import { CheckBoxQuestion } from './questionCheckBox';
import { RTXQuestion } from './questionRTX';
import { DateQuestion } from './questionDate';

const zero = 0;
const first = 1;
const second = 2;
const third = 3;
const fourth = 4;
const fifth = 5;
const sixth = 6;
const seventh = 7;
const eighth = 8;
const ninth = 9;
const tenth = 10;
const eleventh = 11;
const twelfth = 12;
const thirteenth = 13;
const fourteenth = 14;
const fifteenth = 15;

@Injectable(
    {
        providedIn: 'root',
    }
)
export class MaintenanceLogQuestionService {

    gateSelection: { key: string, value: string }[] = [];

    constructor(private gateService: GateService) { }

    getTodayDate(): string {
        let today = new Date();
        let dd ;
        let mm ; //January is 0!
        let yyyy = today.getFullYear().toString();

        if (today.getDate() < 10) {
            dd = '0' + today.getDate().toString();
        }
        else { 
            dd = today.getDate().toString();
        }

        if (today.getMonth() + 1 < 10) {
            mm = '0' + (today.getMonth() + 1).toString();
        }
        else {
            mm = today.getMonth();
        }

        let date = yyyy + '-' + mm + '-' + dd
        console.log(date)
        return date;
    }

    async getGates() {
        this.gateSelection = [];
        await this.gateService.getGatesPromise().then(gates => {
            gates.forEach(gate => {
                this.gateSelection.push({ key: gate.name, value: gate.name })
            })
            //console.log(this.gateSelection);
        });
    }

    /*[
        { key: 'srw001 Siol Kanan', value: 'Siol Kanan' },
        { key: 'srw002 Ketup', value: 'Ketup' },
        { key: 'srw003 Moyan Ulu East', value: 'Moyan Ulu East' },
        { key: 'srw004 Serpan Ulu', value: 'Serpan Ulu' },
        { key: 'srw005 Asajaya Ulu', value: 'Asajaya Ulu' },
        { key: 'srw006 Sampun Gerunggang', value: 'Sampun Gerunggang' },
        { key: 'srw007 Moyan Ulu (West)', value: 'Moyan Ulu (West)' },
        { key: 'srw008 Beliong', value: 'Beliong' },
        { key: 'srw009 Meranti', value: 'Meranti' },
        { key: 'srw010 Sampat', value: 'Sampat' },
        { key: 'srw011 Sampun Kelili', value: 'Sampun Kelili' },
        { key: 'srw012 Segali', value: 'Segali' },
    ];*/

    // TODO: get from a remote source of question metadata
    getQuestions() {

        this.getGates();

        let questions: QuestionBase<string>[] = [
            new GroupLabelQuestion({
                key: '0.0 GATE INFORMATION',
                label: '0.0 GATE INFORMATION',
                value: '',
                required: false,
                order: zero
            }),
            new DropdownQuestion({
                key: 'Gate Name',
                label: 'Gate Name',
                options: this.gateSelection,
                required: true,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Maintenance Date',
                label: 'Maintenance Date',
                required: true,
                value: '2020-07-01',
                type: 'Date',
                order: zero
            }),
            new GroupLabelQuestion({
                key: 'TESTING 1.0 : POWER SUPPLY (415Vac, 3 Phase) TESTING',
                label: 'TESTING 1.0 : POWER SUPPLY (415Vac, 3 Phase) TESTING',
                value: '',
                required: false,
                order: first
            }),
            new TextboxQuestion({
                key: 'Red / Blue Phases Supply Voltage Testing',
                label: 'Red / Blue Phases Supply Voltage Testing',
                value: '',
                required: false,
                order: first
            }),

            new TextboxQuestion({
                key: 'Red / Yellow Phases Supply Voltage Testing',
                label: 'Red / Yellow Phases Supply Voltage Testing',
                value: '',
                required: false,
                order: first
            }),

            new TextboxQuestion({
                key: 'Yellow / Blue Phases Supply Voltage Testing',
                label: 'Yellow / Blue Phases Supply Voltage Testing',
                value: '',
                required: false,
                order: first
            }),

            new DropdownQuestion({
                key: 'RCCB auto re-close function verification.',
                label: 'RCCB auto re-close function verification.',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: first
            }),

            new DropdownQuestion({
                key: 'RCCB function verification',
                label: 'RCCB function verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: first
            }),
            new GroupLabelQuestion({
                key: 'TESTING 1.1 : POWER SUPPLY (240Vac, 1 Phase) TESTING',
                label: 'TESTING 1.1 : POWER SUPPLY (240Vac, 1 Phase) TESTING',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Red / Neutral Phases Supply Voltage Testing ',
                label: 'Red / Neutral Phases Supply Voltage Testing ',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Yellow / Neutral Phases Supply Voltage Testing',
                label: 'Yellow / Neutral Phases Supply Voltage Testing',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Blue / Neutral Phases Supply Voltage Testing ',
                label: 'Blue / Neutral Phases Supply Voltage Testing ',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Power Supply 240Vac/24Vdc reading',
                label: 'Power Supply 240Vac/24Vdc reading',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Power Supply 240Vdc/5Vdc reading',
                label: 'Power Supply 240Vdc/5Vdc reading',
                value: '',
                required: false,
                order: second
            }),
            new GroupLabelQuestion({
                key: 'TESTING 1.2 : SOLAR POWER SUPPLY & SOLAR POWER CHARGING TESTING',
                label: 'TESTING 1.2 : SOLAR POWER SUPPLY & SOLAR POWER CHARGING TESTING',
                value: '',
                required: false,
                order: third
            }),
            new DropdownQuestion({
                key: 'Solar Main Power Supply Voltage Testing',
                label: 'Solar Main Power Supply Voltage Testing',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: third
            }),
            new TextboxQuestion({
                key: 'Solar Main Power Supply Voltage Testing Value',
                label: 'Solar Main Power Supply Voltage Testing Value',
                value: '',
                required: false,
                order: third
            }),
            new DropdownQuestion({
                key: 'Solar Main Power Supply Voltage Testing',
                label: 'Solar Main Power Supply Voltage Testing',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: third
            }),
            new TextboxQuestion({
                key: 'Solar Power Charging Ampere and Voltage Testing Value',
                label: 'Solar Power Charging Ampere and Voltage Testing Value',
                value: '',
                required: false,
                order: third
            }),
            new GroupLabelQuestion({
                key: 'TESTING 2.0 : SECONDARY POWER BACK UP',
                label: 'TESTING 2.0 : SECONDARY POWER BACK UP',
                value: '',
                required: false,
                order: fourth
            }),
            new DropdownQuestion({
                key: 'UPS Backup Verification',
                label: 'UPS Backup Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fourth
            }),
            new DropdownQuestion({
                key: 'Power resume after power down.',
                label: 'Power resume after power down.',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fourth
            }),
            new DropdownQuestion({
                key: 'UPS Backup Time Verification',
                label: 'UPS Backup Time Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fourth
            }),
            new TextboxQuestion({
                key: 'State the duration of the Backup Time',
                label: 'State the duration of the Backup Time',
                value: '',
                required: false,
                order: fourth
            }),
            new GroupLabelQuestion({
                key: 'TESTING 3.0 : GATE OPERATIONAL (MANUAL, AUTO, REMOTE AND EMERGENCY STOP)',
                label: 'TESTING 3.0 : GATE OPERATIONAL (MANUAL, AUTO, REMOTE AND EMERGENCY STOP)',
                value: '',
                required: false,
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Actuator Fully Open Signal Test',
                label: 'Actuator Fully Open Signal Test',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Actuator Fully Closed Signal Test',
                label: 'Actuator Fully Closed Signal Test',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Gate Manual Control Test',
                label: 'Gate Manual Control Test',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Gate Auto Control Test',
                label: 'Gate Auto Control Test',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Emergency Stop the Operation',
                label: 'Emergency Stop the Operation',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: fifth
            }),
            new GroupLabelQuestion({
                key: 'TESTING 4.0 : WATER LEVEL AND SENSOR CALIBRATION',
                label: 'TESTING 4.0 : WATER LEVEL AND SENSOR CALIBRATION',
                value: '',
                required: false,
                order: sixth
            }),
            new TextboxQuestion({
                key: 'Upstream Water Level Measurement',
                label: 'Upstream Water Level Measurement',
                value: '',
                required: false,
                order: sixth
            }),
            new TextboxQuestion({
                key: 'Downstream Water Level Measurement',
                label: 'Downstream Water Level Measurement',
                value: '',
                required: false,
                order: sixth
            }),
            new DropdownQuestion({
                key: 'Verify Upstream Sensor Reading is same as Real Water Level',
                label: 'Verify Upstream Sensor Reading is same as Real Water Level',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: sixth
            }),
            new DropdownQuestion({
                key: 'Verify Downstream Sensor Reading is same as Real Water Level',
                label: 'Verify Downstream Sensor Reading is same as Real Water Level',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: sixth
            }),
            new GroupLabelQuestion({
                key: 'TESTING 5.0 : TOUCH SCREEN VERIFICATION',
                label: 'TESTING 5.0 : TOUCH SCREEN VERIFICATION',
                value: '',
                required: false,
                order: seventh
            }),
            new DropdownQuestion({
                key: 'Different Level User Login Verification',
                label: 'Different Level User Login Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: seventh
            }),
            new DropdownQuestion({
                key: 'Button Function Verification',
                label: 'Button Function Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: seventh
            }),
            new DropdownQuestion({
                key: 'Gate Info Page Verification',
                label: 'Gate Info Page Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: seventh
            }),
            new GroupLabelQuestion({
                key: 'TESTING 6.0 : SYSTEM EMERGENCY ALERT AND INFO REQUEST VERIFICATION',
                label: 'TESTING 6.0 : SYSTEM EMERGENCY ALERT AND INFO REQUEST VERIFICATION',
                value: '',
                required: false,
                order: eighth
            }),
            new DropdownQuestion({
                key: 'Local Emergency Alert System Verification',
                label: 'Local Emergency Alert System Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: eighth
            }),
            new DropdownQuestion({
                key: 'Emergency SMS Alert Verification',
                label: 'Emergency SMS Alert Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: eighth
            }),
            new DropdownQuestion({
                key: 'Gate Info Request Center',
                label: 'Gate Info Request Center',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: eighth
            }),
            new TextboxQuestion({
                key: 'Gate Info Request Center:',
                label: 'Gate Info Request Center:',
                value: '',
                required: false,
                order: eighth
            }),
            new GroupLabelQuestion({
                key: 'TESTING 7.0 : ACTUATOR FUNCTION VERIFICATION',
                label: 'TESTING 7.0 : ACTUATOR FUNCTION VERIFICATION',
                value: '',
                required: false,
                order: ninth
            }),
            new DropdownQuestion({
                key: 'Actuator Local/Remote Signal Test',
                label: 'Actuator Local/Remote Signal Test',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: ninth
            }),
            new DropdownQuestion({
                key: 'Gate Local (Actuator) Control Test',
                label: 'Gate Local (Actuator) Control Test',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: ninth
            }),
            new DropdownQuestion({
                key: 'Replace 9V Battery for Rotork Actuator',
                label: 'Replace 9V Battery for Rotork Actuator',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: ninth
            }),
            new TextboxQuestion({
                key: 'State the number of 9V batteries replaced:',
                label: 'State the number of 9V batteries replaced:',
                value: '',
                required: false,
                order: ninth
            }),
            new GroupLabelQuestion({
                key: 'TESTING 8.0 : FLOOD SURVEILLANCE VERIFICATION',
                label: 'TESTING 8.0 : FLOOD SURVEILLANCE VERIFICATION',
                value: '',
                required: false,
                order: tenth
            }),
            new DropdownQuestion({
                key: 'PTZ Camera Verification',
                label: 'PTZ Camera Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: tenth
            }),
            new DropdownQuestion({
                key: 'PTZ Camera Verification',
                label: 'PTZ Camera Verification',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: tenth
            }),
            new GroupLabelQuestion({
                key: 'TESTING 9.0 RAIN GAUGE FUNCTION VERIFICATION',
                label: 'TESTING 9.0 RAIN GAUGE FUNCTION VERIFICATION',
                value: '',
                required: false,
                order: eleventh
            }),
            new DropdownQuestion({
                key: 'Rain gauge functioning test. Due to the collected 0.5mm rainwater. ',
                label: 'Rain gauge functioning test. Due to the collected 0.5mm rainwater. ',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: eleventh
            }),
            new GroupLabelQuestion({
                key: 'TESTING 10.0 CONTROL PANEL CLEANING AND COMPONENTS MAINTENANCE',
                label: 'TESTING 10.0 CONTROL PANEL CLEANING AND COMPONENTS MAINTENANCE',
                value: '',
                required: false,
                order: twelfth
            }),
            new DropdownQuestion({
                key: 'Control Panel Cleaning ',
                label: 'Control Panel Cleaning ',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: twelfth
            }),
            new DropdownQuestion({
                key: 'Control Panel Maintenance',
                label: 'Control Panel Maintenance',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: twelfth
            }),
            new DropdownQuestion({
                key: 'Control Panel Components Checking',
                label: 'Control Panel Components Checking',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: twelfth
            }),

            new GroupLabelQuestion({
                key: 'SUMMARY',
                label: 'SUMMARY',
                value: '',
                required: false,
                order: thirteenth
            }),
            new CheckBoxQuestion({
                key: 'Action_Taken',
                label: 'Action Taken',
                checkboxes: [
                    { key: 'AT_Maintenance', label: 'Maintenance', value: false },
                    { key: 'AT_Visit', label: 'Visit', value: false },
                    { key: 'AT_Inspection', label: 'Inspection', value: false },
                    { key: 'AT_Commisioning', label: 'Commisioning', value: false },
                    { key: 'AT_No Action', label: 'No Action', value: false }
                ],
                order: thirteenth
            }),
            new RTXQuestion({
                key: 'RTX_Action_Taken',
                value: '<p></p><br><p></p>',
                required: false,
                order: thirteenth
            }),
            new CheckBoxQuestion({
                key: 'Action_Needed',
                label: 'Action Needed',
                checkboxes: [
                    { key: 'AN_Maintenance', label: 'Maintenance', value: false },
                    { key: 'AN_Visit', label: 'Visit', value: false },
                    { key: 'AN_Inspection', label: 'Inspection', value: false },
                    { key: 'AN_Commisioning', label: 'Commisioning', value: false },
                    { key: 'AN_No Action', label: 'No Action', value: false }
                ],
                order: thirteenth
            }),
            new RTXQuestion({
                key: 'RTX_Action_Needed',
                value: '<p></p><br><p></p>',
                required: false,
                order: thirteenth
            }),
            new DropdownQuestion({
                key: 'State if you have completed the protocol *',
                label: 'State if you have completed the protocol *',
                value: 'C',
                options: [
                    { key: 'c', value: 'C' },
                    { key: 'NC', value: 'NC' },
                    { key: 'NA', value: 'NA' },
                ],
                order: thirteenth
            }),
            new TextboxQuestion({
                key: 'Tested by *',
                label: 'Tested by *',
                value: '',
                required: false,
                order: thirteenth
            }),
            new TextboxQuestion({
                key: 'Witnessed by',
                label: 'Witnessed by',
                value: '',
                required: false,
                order: thirteenth
            }),
            new TextboxQuestion({
                key: 'Reviewed by',
                label: 'Reviewed by',
                value: '',
                required: false,
                order: thirteenth
            }),
            new TextboxQuestion({
                key: 'Approved by',
                label: 'Approved by',
                value: '',
                required: false,
                order: thirteenth
            }),
        ];

        return questions.sort((a, b) => a.order - b.order);
    }

}