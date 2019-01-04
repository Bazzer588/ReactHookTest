
export default t = {
    errors: {
        required: {
            d: 'This field is required',
            e: '{f}: required field'
        },
        minLength: {
            d: 'This field must contain at least {n} characters',
            e: '{f}: must contain {n} characters',
            email: 'Email address must be at least {n} characters in the form "name@address"'
        },
        dateYYYYMMDD: {
            d: 'Please enter year, month then day'
        },
        dateDay: {
            d: 'Invalid day of month'
        }
    },

    labels: {
        email: 'Email address',
        dob: 'Date of birth',
        silly: 'Please enter the RB208 code here it is very important and not optional'
    },

    short: {
        silly: 'RB208 code'
    },

    'NOT-SURE': '-----------------------------------------',

    tree: {
        profileForm: {
            d: {
                email: 'Your personal email address'
            },
            spouseDetails: {
                email: 'Your spouse or partner\'s email'
            }
        },
        summaryForm: {

        }
    }
};

/*

    form-section-field-error

    profileForm-personalDetails-email-required


.modal-dialog
.modal-content
   max-height: 90%;

.modal-body {
 position: relative;
 flex: 1 1 auto;
 padding: 1rem;
 max-height: 400px;
 overflow-y: scroll;
 }

    Application
    Applicants
        Bob Smith
            Personal Details
            Employment
            Income
            Expenses
        Mrs Smith
        Uncle Jones
    + add applicant
    Summary
    Declarations

 */
