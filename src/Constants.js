const env = process.env.REACT_APP_ENV;

const prod = {
  url: {
    API_URL: 'https://graduates-system-tu/api/v1',
  }
};

const dev = {
  url: {
    API_URL: 'http://localhost:8080',
  }
};

const mock = {
  url: {
    API_URL: `http://localhost:8080`
  }
};

export const config = env === 'production' ? prod : env === 'development' ? dev : env === 'mock' ? mock : mock;
