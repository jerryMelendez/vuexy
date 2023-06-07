'use strict';
const formAuthentication = document.querySelector('#formAuthentication');

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Please enter username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Please enter your email'
              },
              emailAddress: {
                message: 'Please enter valid email address'
              }
            }
          },
          'strUser': {
            validators: {
              notEmpty: {
                message: 'Por favor escriba su nombre de usuario'
              },
              stringLength: {
                min: 6,
                message: 'El nombre de usuario debe tener más de 6 caracteres'
              }
            }
          },
          'strPass': {
            validators: {
              notEmpty: {
                message: 'Por favor escriba su contraseña'
              },
              stringLength: {
                min: 4,
                message: 'La contraseña debe tener al menos 4 caracteres'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Please confirm password'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="strPass"]').value;
                },
                message: 'The password and its confirm are not the same'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Please agree terms & conditions'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        }
      });

      formAuthentication.addEventListener('submit', function (e) {
        e.preventDefault(); // Detener la ejecución predeterminada del submit

        // Validar los campos del formulario
        fv.validate().then(function (status) {
          if (status === 'Valid') {
            // La validación de los campos es exitosa
            tuFuncionDespuesDeLaValidacion();
            formAuthentication.submit(); // Ejecutar el submit
          }
        });
      });
    }
  })();
});

function tuFuncionDespuesDeLaValidacion() {
  // Código de tu función que deseas ejecutar después de la validación exitosa
  alert('La validación de strUser y strPass es exitosa. Ejecutando función...');
}
