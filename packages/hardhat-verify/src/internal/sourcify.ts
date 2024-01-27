<<<<<<< HEAD
import type { Dispatcher } from "undici/types";
=======
>>>>>>> fac1221b81 ("hardhat": patch)
import type {
  SourcifyIsVerifiedResponse,
  SourcifyVerifyResponse,
} from "./sourcify.types";

import {
  ContractVerificationInvalidStatusCodeError,
<<<<<<< HEAD
  NetworkRequestError,
  VerificationAPIUnexpectedMessageError,
=======
  UnexpectedError,
>>>>>>> fac1221b81 ("hardhat": patch)
} from "./errors";
import { isSuccessStatusCode, sendGetRequest, sendPostRequest } from "./undici";
import { ContractStatus } from "./sourcify.types";
import { ValidationResponse } from "./utilities";

export class Sourcify {
  constructor(
    public chainId: number,
    public apiUrl: string,
    public browserUrl: string
  ) {}

  // https://sourcify.dev/server/api-docs/#/Repository/get_check_all_by_addresses
  public async isVerified(address: string) {
    const parameters = new URLSearchParams({
      addresses: address,
      chainIds: `${this.chainId}`,
    });

    const url = new URL(`${this.apiUrl}/check-all-by-addresses`);
    url.search = parameters.toString();

<<<<<<< HEAD
    let response: Dispatcher.ResponseData | undefined;
    let json: SourcifyIsVerifiedResponse[] | undefined;
    try {
      response = await sendGetRequest(url);
      json = (await response.body.json()) as SourcifyIsVerifiedResponse[];
    } catch (e: any) {
      throw new NetworkRequestError(e);
    }

    if (!isSuccessStatusCode(response.statusCode)) {
      throw new ContractVerificationInvalidStatusCodeError(
        url.toString(),
        response.statusCode,
        JSON.stringify(json)
      );
    }

    if (!Array.isArray(json)) {
      throw new VerificationAPIUnexpectedMessageError(
        `Unexpected response body: ${JSON.stringify(json)}`
      );
    }

    const contract = json.find(
      (match) => match.address.toLowerCase() === address.toLowerCase()
    );
    if (contract === undefined) {
      return false;
    }

    if ("status" in contract && contract.status === ContractStatus.NOT_FOUND) {
      return false;
    }

    if ("chainIds" in contract && contract.chainIds.length === 1) {
      const { status } = contract.chainIds[0];
      if (
        status === ContractStatus.PERFECT ||
        status === ContractStatus.PARTIAL
      ) {
        return status;
      }
    }

    throw new VerificationAPIUnexpectedMessageError(
      `Unexpected response body: ${JSON.stringify(json)}`
    );
=======
    try {
      const response = await sendGetRequest(url);
      const json = (await response.body.json()) as SourcifyIsVerifiedResponse[];

      if (!isSuccessStatusCode(response.statusCode)) {
        throw new ContractVerificationInvalidStatusCodeError(
          url.toString(),
          response.statusCode,
          JSON.stringify(json)
        );
      }

      if (!Array.isArray(json)) {
        throw new Error(`Unexpected response body: ${JSON.stringify(json)}`);
      }

      const contract = json.find(
        (match) => match.address.toLowerCase() === address.toLowerCase()
      );
      if (contract === undefined) {
        return false;
      }

      if (
        "status" in contract &&
        contract.status === ContractStatus.NOT_FOUND
      ) {
        return false;
      }

      if ("chainIds" in contract && contract.chainIds.length === 1) {
        const { status } = contract.chainIds[0];
        if (
          status === ContractStatus.PERFECT ||
          status === ContractStatus.PARTIAL
        ) {
          return status;
        }
      }

      throw new Error(`Unexpected response body: ${JSON.stringify(json)}`);
    } catch (e) {
      if (e instanceof ContractVerificationInvalidStatusCodeError) {
        throw e;
      }
      throw new UnexpectedError(e, "Sourcify.isVerified");
    }
>>>>>>> fac1221b81 ("hardhat": patch)
  }

  // https://sourcify.dev/server/api-docs/#/Stateless%20Verification/post_verify
  public async verify(
    address: string,
    files: Record<string, string>,
    chosenContract?: number
  ): Promise<SourcifyResponse> {
    const parameters: any = {
      address,
      files,
      chain: `${this.chainId}`,
    };

    if (chosenContract !== undefined) {
      parameters.chosenContract = `${chosenContract}`;
    }

    const url = new URL(this.apiUrl);
<<<<<<< HEAD

    let response: Dispatcher.ResponseData | undefined;
    let json: SourcifyVerifyResponse | undefined;
    try {
      response = await sendPostRequest(url, JSON.stringify(parameters), {
        "Content-Type": "application/json",
      });
      json = (await response.body.json()) as SourcifyVerifyResponse;
    } catch (e: any) {
      throw new NetworkRequestError(e);
    }

    if (!isSuccessStatusCode(response.statusCode)) {
      throw new ContractVerificationInvalidStatusCodeError(
        url.toString(),
        response.statusCode,
        JSON.stringify(json)
      );
    }

    const sourcifyResponse = new SourcifyResponse(json);

    if (!sourcifyResponse.isOk()) {
      throw new VerificationAPIUnexpectedMessageError(
        `Verify response is not ok: ${JSON.stringify(json)}`
      );
    }

    return sourcifyResponse;
=======
    try {
      const response = await sendPostRequest(url, JSON.stringify(parameters), {
        "Content-Type": "application/json",
      });
      const json = (await response.body.json()) as SourcifyVerifyResponse;

      if (!isSuccessStatusCode(response.statusCode)) {
        throw new ContractVerificationInvalidStatusCodeError(
          url.toString(),
          response.statusCode,
          JSON.stringify(json)
        );
      }

      const sourcifyResponse = new SourcifyResponse(json);

      if (!sourcifyResponse.isOk()) {
        throw new Error(`Verify response is not ok: ${JSON.stringify(json)}`);
      }

      return sourcifyResponse;
    } catch (e) {
      if (e instanceof ContractVerificationInvalidStatusCodeError) {
        throw e;
      }
      throw new UnexpectedError(e, "Sourcify.verify");
    }
>>>>>>> fac1221b81 ("hardhat": patch)
  }

  public getContractUrl(
    address: string,
    contractStatus: ContractStatus.PERFECT | ContractStatus.PARTIAL
  ) {
    const matchType =
      contractStatus === ContractStatus.PERFECT
        ? "full_match"
        : "partial_match";
    return `${this.browserUrl}/contracts/${matchType}/${this.chainId}/${address}/`;
  }
}

class SourcifyResponse implements ValidationResponse {
  public readonly error: string | undefined;
  public readonly status:
    | ContractStatus.PERFECT
    | ContractStatus.PARTIAL
    | undefined;

  constructor(response: SourcifyVerifyResponse) {
    if ("error" in response) {
      this.error = response.error;
    } else if (response.result[0].status === ContractStatus.PERFECT) {
      this.status = ContractStatus.PERFECT;
    } else if (response.result[0].status === ContractStatus.PARTIAL) {
      this.status = ContractStatus.PARTIAL;
    }
  }

  public isPending() {
    return false;
  }

  public isFailure() {
    return this.error !== undefined;
  }

  public isSuccess() {
    return this.error === undefined;
  }

  public isOk(): this is {
    status: ContractStatus.PERFECT | ContractStatus.PARTIAL;
  } {
    return (
      this.status === ContractStatus.PERFECT ||
      this.status === ContractStatus.PARTIAL
    );
  }
}
