import UserService from "./user.service";

describe("User service", () => {
  const userService = new UserService();
  it("Should logout user", () => {
    const mockRequest = {
      user: 1,
    };
    const mockResponse: any = {
      json: jest.fn(),
    };
    userService.logout(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
  });
});
