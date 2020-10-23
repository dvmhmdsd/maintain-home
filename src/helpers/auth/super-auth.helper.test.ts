import { NextFunction } from "express";
import authorizeSuperAuth from "./super-auth.helper";

describe("Super admin auth middleware", () => {
  it("Should throw error if no user exists", () => {
    const mockRequest: any = {
      user: null,
    };
    const mockResponse: any = {};
    const nextFunction: NextFunction = jest.fn();

    expect(() =>
      authorizeSuperAuth(mockRequest, mockResponse, nextFunction)
    ).toThrow();
  });

  it("Should throw error if the user is not super admin", () => {
    const mockRequest: any = {
      user: {
        type: "admin",
      },
    };
    const mockResponse: any = {};
    const nextFunction: NextFunction = jest.fn();

    expect(() =>
      authorizeSuperAuth(mockRequest, mockResponse, nextFunction)
    ).toThrow();
  });

  it("Should not throw error if the user is super admin", () => {
    const mockRequest: any = {
      user: {
        type: "Super",
      },
    };
    const mockResponse: any = {};
    const nextFunction: NextFunction = jest.fn();

    expect(() =>
      authorizeSuperAuth(mockRequest, mockResponse, nextFunction)
    ).not.toThrow();
  });
});
