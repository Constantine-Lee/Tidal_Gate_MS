// import the required animation functions from the angular animations module
import { trigger, animate, transition, style, state } from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition('void => *', [
            // css styles at start of transition
                        style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            animate('500ms', style({ opacity: 0 }))
          ])
    ]);