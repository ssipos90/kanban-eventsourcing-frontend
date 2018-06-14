export default {
  methods: {
    resetFieldErrors() {
      Object.keys(this.fields).forEach(field => {
        this.fields[field].errors = [];
      });
    },
    fieldsData() {
      const data = {};
      Object.keys(this.fields).forEach(field => {
        data[field] = this.fields[field].value;
      });

      return data;
    },
    handleValidationErrors(errors) {
      Object.keys(this.fields).forEach(field => {
        if (errors.hasOwnProperty(field)) {
          this.fields[field].errors = errors[field];
        }
      });
    },
    handleResponseError(data, status, statusText) {
      console.log(status, statusText, data);
    }
  }
};
