import { Unsubscribe } from "firebase/database";
import { RefObject } from "react";
import { listenToPlayerPosition } from "src/modules/game/engine/asyncActions/listenToPlayerPosition";
import { GameEngine } from "src/modules/game/engine/GameEngine";
import { store } from "src/store/store";
import { AppDispatch, RootState } from "src/store/types";

interface GameEngineConfig {
  canvas: RefObject<HTMLCanvasElement>;
  gameContainer: RefObject<HTMLDivElement>;
}

class GameManager {
  private static instance: GameManager;
  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  private gameEngine: GameEngine | null = null;
  private unsubscribeFirebase: Unsubscribe | null = null;
  private unsubscribeReduxStore: (() => void) | null = null;

  private constructor() {
    console.log("GameManager initialized.");
  }

  // === Metody inicjalizacji i zarządzania ===
  public async startGame(gameEngineConfig: GameEngineConfig) {
    if (this.gameEngine) {
      console.warn("Game engine already started.");
      return;
    }

    console.log("Starting game engine and Firebase listeners...");

    this.unsubscribeFirebase = await (store.dispatch as AppDispatch)(
      listenToPlayerPosition(),
    );

    this.gameEngine = new GameEngine(gameEngineConfig); // Przekazujemy referencję do GameManagera
    this.gameEngine.init(); // Uruchamiamy pętlę silnika

    console.log("Game started.");
  }

  public stopGame(): void {
    /*console.log("Stopping game and Firebase listeners...");
    if (this.unsubscribeFirebase) {
      this.unsubscribeFirebase();
      this.unsubscribeFirebase = null;
    }
    if (this.unsubscribeReduxStore) {
      this.unsubscribeReduxStore();
      this.unsubscribeReduxStore = null;
    }
    if (this.gameEngine) {
      this.gameEngine.stopLoop();
      this.gameEngine = null;
    }
    console.log("Game stopped.");*/
  }

  // === Metody do interakcji z Redux, udostępniane dla reszty Game Engine ===

  // Metoda, którą klasy/funkcje silnika będą wywoływać do wysyłania akcji
  public dispatchToRedux(action: Parameters<AppDispatch>[0]): void {
    (store.dispatch as AppDispatch)(action);
  }

  // Metoda, którą klasy/funkcje silnika będą wywoływać do pobierania stanu
  public getCurrentReduxState(): RootState {
    return store.getState() as RootState;
  }

  // Metoda zwracająca instancję GameEngine (dla komponentów UI, jeśli potrzebne)
  public getEngineInstance(): GameEngine | null {
    return this.gameEngine;
  }
}

// Globalnie dostępna instancja (singleton)
const gameManager = GameManager.getInstance();
export default gameManager;
