import { SocketEngine, UISocket } from "./ui.socket";

export class MainUISocket extends UISocket {
  constructor(mainEngine: SocketEngine) {
    super(mainEngine);
  }

  public init() {
    super.init(3001);
  }
}
