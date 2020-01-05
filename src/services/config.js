let baseUrl = "";
let subscribeUrl = "";
if (process.env.NODE_ENV === "production") {
  baseUrl = "https://new.maths300.com/api/v1/";
  subscribeUrl = "https://new.maths300.com/subscribe";
} else {
  baseUrl = "http://maths300.test/api/v1/";
  subscribeUrl = "http://maths300.test/subscribe";
}

export const apiHost = baseUrl;
export const subscribeLink = subscribeUrl;
