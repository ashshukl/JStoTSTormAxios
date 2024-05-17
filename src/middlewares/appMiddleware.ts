import express from "express";

export const AppMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("1. Request intercepted by AppMiddleware");
  const accessToken = req.headers["access-token"];

  if (!accessToken || accessToken[0].trim() === "") {
    return res.status(400).json({ error: "AccessToken missing or empty" });
  }

  // If AccessToken is present, continue to the next middleware or route handler
  next();
};
