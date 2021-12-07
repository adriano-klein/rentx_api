import { request, Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase";

class SendForgottenPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgottenPasswordMailUseCase = container.resolve(
      SendForgottenPasswordMailUseCase
    );

    await sendForgottenPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgottenPasswordMailController };
