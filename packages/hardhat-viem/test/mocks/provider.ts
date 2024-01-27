import type {
  EthereumProvider,
  RequestArguments,
  JsonRpcRequest,
  JsonRpcResponse,
} from "hardhat/types";

import EventEmitter from "events";

export class EthereumMockedProvider
  extends EventEmitter
  implements EthereumProvider
{
<<<<<<< HEAD
  public calledCount = 0;

  public async request(_args: RequestArguments): Promise<any> {
    this.calledCount++;
    throw new Error();
  }
=======
  public async request(_args: RequestArguments): Promise<any> {}
>>>>>>> fac1221b81 ("hardhat": patch)

  public async send(_method: string, _params: any[] = []) {}

  public sendAsync(
    _payload: JsonRpcRequest,
    callback: (error: any, response: JsonRpcResponse) => void
  ) {
    callback(null, {} as JsonRpcRequest); // this is here just to finish the "async" operation
  }
}
