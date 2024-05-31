import { MainEngine, UISocket } from "./ui.socket";

export class MainUISocket extends UISocket {
  constructor(mainEngine: MainEngine) {
    super(mainEngine);
  }

  public init() {
    super.init(3001);
  }
}
