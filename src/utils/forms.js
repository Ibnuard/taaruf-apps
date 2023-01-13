export const MushForm = (config = []) => {
  let temp;

  for (let i = 0; i < config.length; i++) {
    temp = {...temp, ..._validate(config[i])};
  }

  function _setErrorMessage(key, data) {
    switch (key) {
      case 'REQUIRED_ERROR':
        return (
          data?.requiredErrorMessage ?? `${data?.caption} tidak boleh kosong!`
        );
        break;
      case 'MIN_CHAR_ERROR':
        return (
          data?.minCharErrorMessage ??
          `${data.caption} minimal terdiri dari ${data?.minMaxChar[0]} karakter`
        );
        break;
      case 'MAX_CHAR_ERROR':
        return (
          data?.maxCharErrorMessage ??
          `${data.caption} maksimal terdiri dari ${data?.minMaxChar[1]} karakter`
        );
        break;
      case 'EMAIL_VALIDATION_ERROR':
        return data?.emailErrorMessage ?? `Alamat email tidak valid!`;
        break;
      case 'PHONE_VALIDATION_ERROR':
        return data?.phoneErrorMessage ?? `Format nomor harus diawali 62xx`;
        break;
      case 'NUMBER_ALLOWED_ERROR':
        return (
          data?.phoneErrorMessage ??
          `${data.caption} tidak boleh mengandung angka atau nomor telpon`
        );
        break;
      default:
        break;
    }
  }

  //validation
  function _validate(data) {
    const numberExamples = ['08', '62', '628'];

    if (data?.required) {
      if (data.value.length < 1) {
        return {[data?.key]: _setErrorMessage('REQUIRED_ERROR', data)};
      } else {
        if (data.type == 'email') {
          if (
            data?.value?.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
          ) {
            if (data?.value?.length < data?.minMaxChar[0]) {
              return {[data?.key]: _setErrorMessage('MIN_CHAR_ERROR', data)};
            } else if (data?.value?.length > data?.minMaxChar[1]) {
              return {[data?.key]: _setErrorMessage('MAX_CHAR_ERROR', data)};
            } else {
              return null;
            }
          } else {
            return {
              [data?.key]: _setErrorMessage('EMAIL_VALIDATION_ERROR', data),
            };
          }
        } else if (data.type == 'phonenumber') {
          const getprefix = data?.value?.substring(0, 2);

          if (String(getprefix) == '62') {
            if (data?.value?.length < data?.minMaxChar[0]) {
              return {
                [data?.key]: _setErrorMessage('MIN_CHAR_ERROR', data),
              };
            } else if (data?.value?.length > data?.minMaxChar[1]) {
              return {
                [data?.key]: _setErrorMessage('MAX_CHAR_ERROR', data),
              };
            } else {
              return null;
            }
          } else {
            return {
              [data?.key]: _setErrorMessage('PHONE_VALIDATION_ERROR', data),
            };
          }
        } else {
          if (data.minMaxChar) {
            if (data?.value?.length < data?.minMaxChar[0]) {
              return {[data?.key]: _setErrorMessage('MIN_CHAR_ERROR', data)};
            } else if (data?.value?.length > data?.minMaxChar[1]) {
              return {[data?.key]: _setErrorMessage('MAX_CHAR_ERROR', data)};
            } else {
              if (!data.preventNumber) {
                return null;
              } else {
                if (
                  numberExamples.some(v => {
                    return data.value.includes(v);
                  })
                ) {
                  return {
                    [data?.key]: _setErrorMessage('NUMBER_ALLOWED_ERROR', data),
                  };
                } else {
                  return null;
                }
              }
            }
          } else {
            if (!data.preventNumber) {
              return null;
            } else {
              if (
                numberExamples.some(v => {
                  return data.value.includes(v);
                })
              ) {
                return {
                  [data?.key]: _setErrorMessage('NUMBER_ALLOWED_ERROR', data),
                };
              } else {
                return null;
              }
            }
          }
        }
      }
    } else {
      if (data?.minMaxChar) {
        if (data?.value?.length < data?.minMaxChar[0]) {
          return {[data?.key]: _setErrorMessage('MIN_CHAR_ERROR', data)};
        } else if (data?.value?.length > data?.minMaxChar[1]) {
          return {[data?.key]: _setErrorMessage('MIN_CHAR_ERROR', data)};
        } else {
          if (!data.preventNumber) {
            return null;
          } else {
            if (
              numberExamples.some(v => {
                return data.value.includes(v);
              })
            ) {
              return {
                [data?.key]: _setErrorMessage('NUMBER_ALLOWED_ERROR', data),
              };
            } else {
              return null;
            }
          }
        }
      } else {
        if (!data.preventNumber) {
          return null;
        } else {
          if (
            numberExamples.some(v => {
              return data.value.includes(v);
            })
          ) {
            return {
              [data?.key]: _setErrorMessage('NUMBER_ALLOWED_ERROR', data),
            };
          } else {
            return null;
          }
        }
      }
    }
  }

  return {errors: temp};
};
