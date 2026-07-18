export class AppService {
  getHealthcheck() {
    const date = new Date();
    const status = 200;

    return {
      status,
      date,
      message: "OK",
    };
  }
}
