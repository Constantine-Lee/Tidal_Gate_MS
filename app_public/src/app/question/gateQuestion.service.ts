import { Injectable } from '@angular/core';

import { QuestionBase } from './questionBase';
import { TextboxQuestion, GroupLabelQuestion } from './questionTextbox';

import { FullTextboxQuestion } from './fullQuestionTextbox';

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
@Injectable({
    providedIn:'root',
})
export class GateQuestionService {
    
    // TODO: get from a remote source of question metadata
    getGates() {

        let questions: QuestionBase<string>[] = [
            new GroupLabelQuestion({
                key: 'GATE INFORMATION',
                label: 'GATE INFORMATION',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Gate Name',
                label: 'Gate Name',
                value: '',
                required: true,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Gate_ID',
                label: 'Gate ID',
                value: '',
                required: true,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Mitigation Scheme(Location)',
                label: 'Mitigation Scheme(Location)',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Longitude',
                label: 'Longitude',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Lattitude',
                label: 'Lattitude',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Gate Type',
                label: 'Gate Type',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Nos of bays',
                label: 'Nos of bays',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'SCADA Commisioning Year',
                label: 'SCADA Commisioning Year',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'SCADA Commisioning Month',
                label: 'SCADA Commisioning Month',
                value: '',
                required: false,
                order: zero
            }),
            new TextboxQuestion({
                key: 'Power Source Type',
                label: 'Power Source Type',
                value: '',
                required: false,
                order: zero
            }),
            new GroupLabelQuestion({
                key: 'Actuators & Sensors',
                label: 'Actuators & Sensors',
                value: '',
                required: false,
                order: first
            }),

            new TextboxQuestion({
                key: 'Actuator Brand',
                label: 'Actuator Brand',
                value: '',
                required: false,
                order: first
            }),
            new TextboxQuestion({
                key: 'Actuator Model',
                label: 'Actuator Model',
                value: '',
                required: false,
                order: first
            }),
            new TextboxQuestion({
                key: 'Actuator Power(kW)',
                label: 'Actuator Power(kW)',
                value: '',
                required: false,
                order: first
            }),
            new TextboxQuestion({
                key: 'Sensor Brand',
                label: 'Sensor Brand',
                value: '',
                required: false,
                order: first
            }),
            new TextboxQuestion({
                key: 'Sensor Controller Model',
                label: 'Sensor Controller Model',
                value: '',
                required: false,
                order: first
            }),
            new TextboxQuestion({
                key: 'Sensor Head Model',
                label: 'Sensor Head Model',
                value: '',
                required: false,
                order: first
            }),
            new GroupLabelQuestion({
                key: 'SCADA Components',
                label: 'SCADA Components',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'PLC Brand',
                label: 'PLC Brand',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'PLC Model',
                label: 'PLC Model',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'HMI Brand',
                label: 'HMI Brand',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'HMI Type',
                label: 'HMI Type',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'HMI Model',
                label: 'HMI Model',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'RTU Embedded Model',
                label: 'RTU Embedded Model',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Modem Brand',
                label: 'Modem Brand',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Modem Communication',
                label: 'Modem Communication',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Modem Connectivity',
                label: 'Modem Connectivity',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Modem Phone Number',
                label: 'Modem Phone Number',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'Nos of Modem Antennas',
                label: 'Nos of Modem Antennas',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'UPS Brand & Model',
                label: 'UPS Brand & Model',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'UPS Battery Connection Type',
                label: 'UPS Battery Connection Type',
                value: '',
                required: false,
                order: second
            }),
            new TextboxQuestion({
                key: 'UPS Battery Capacity(Ah)',
                label: 'UPS Battery Capacity(Ah)',
                value: '',
                required: false,
                order: second
            }),
            
            new GroupLabelQuestion({
                key: 'Control Settings',
                label: 'Control Settings',
                value: '',
                required: false,
                order: third
            }),            

            new TextboxQuestion({
                key: 'Sensor Level(metres) at 4 mA',
                label: 'Sensor Level(metres) at 4 mA',
                value: '',
                required: false,
                order: third
            }),

            new TextboxQuestion({
                key: 'Sensor Level(metres) at 20 mA',
                label: 'Sensor Level(metres) at 20 mA',
                value: '',
                required: false,
                order: third
            }),
            new TextboxQuestion({
                key: 'Sensor Level(metres) Offset',
                label: 'Sensor Level(metres) Offset',
                value: '',
                required: false,
                order: third
            }),

            new TextboxQuestion({
                key: 'Gate Danger Level(metres) Setpoint(SP)',
                label: 'Gate Danger Level(metres) Setpoint(SP)',
                value: '',
                required: false,
                order: third
            }),
            new TextboxQuestion({
                key: 'Gate Alert Level(metres) Setpoint(SP)',
                label: 'Gate Alert Level(metres) Setpoint(SP)',
                value: '',
                required: false,
                order: third
            }),

            new TextboxQuestion({
                key: 'Gate Control(metres) Setpoint(SP)',
                label: 'Gate Control(metres) Setpoint(SP)',
                value: '',
                required: false,
                order: third
            }),
            new GroupLabelQuestion({
                key: 'SMS Settings',
                label: 'SMS Settings',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Last Setting Date(DD/MM/YYYY)',
                label: 'SMS Last Setting Date(DD/MM/YYYY)',
                value: '',
                type: 'Date',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 1',
                label: 'SMS Name 1',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 1',
                label: 'No 1',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 2',
                label: 'SMS Name 2',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 2',
                label: 'No 2',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 3',
                label: 'SMS Name 3',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 3',
                label: 'No 3',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 4',
                label: 'SMS Name 4',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 4',
                label: 'No 4',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 5',
                label: 'SMS Name 5',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 5',
                label: 'No 5',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 6',
                label: 'SMS Name 6',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 6',
                label: 'No 6',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 7',
                label: 'SMS Name 7',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 7',
                label: 'No 7',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 8',
                label: 'SMS Name 8',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 8',
                label: 'No 8',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 9',
                label: 'SMS Name 9',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 9',
                label: 'No 9',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'SMS Name 10',
                label: 'SMS Name 10',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'No 10',
                label: 'No 10',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'Operator Name',
                label: 'Operator Name',
                value: '',
                required: false,
                order: fourth
            }),
            new TextboxQuestion({
                key: 'Operator Phone Number',
                label: 'Operator Phone Number',
                value: '',
                required: false,
                order: fourth
            }),
            new GroupLabelQuestion({
                key: 'Solar Power Supply(for Solar Supply only)',
                label: 'Solar Power Supply(for Solar Supply only)',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Actuator Solar Charge Controller Model',
                label: 'Actuator Solar Charge Controller Model',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Actuator Solar Usage Unit',
                label: 'Actuator Solar Usage Unit',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Actuator Solar Nos of Batteries',
                label: 'Actuator Solar Nos of Batteries',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Actuator Solar Battery Capacity(Ah)',
                label: 'Actuator Solar Battery Capacity(Ah)',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Actuator Inverter Model',
                label: 'Actuator Inverter Model',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Actuator Inverter Output',
                label: 'Actuator Inverter Output',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'SCADA Solar Charge Controller Model',
                label: 'SCADA Solar Charge Controller Model',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'SCADA Solar Nos of Batteries',
                label: 'SCADA Solar Nos of Batteries',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'SCADA Solar Battery Capacity(Ah)',
                label: 'SCADA Solar Battery Capacity(Ah)',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'SCADA Inverter Model',
                label: 'SCADA Inverter Model',
                value: '',
                required: false,
                order: fifth
            }),
            new TextboxQuestion({
                key: 'SCADA Inverter Output',
                label: 'SCADA Inverter Output',
                value: '',
                required: false,
                order: fifth
            }),
            new GroupLabelQuestion({
                key: 'Last Update Log(remarks)',
                label: 'Last Update Log(remarks)',
                value: '',
                required: false,
                order: sixth
            }),
            new FullTextboxQuestion({
                key: 'Last Update Log(remarks)_TEXTBOX',
                label: '',
                value: '',
                required: false,
                order: sixth
            })
        ];

        return questions.sort((a, b) => a.order - b.order);
    }

}