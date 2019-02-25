export class FcWidgetMock {
  public static mock() {
    const fcWidget = {
      isInitialized: jest.fn(() => false),
      init: jest.fn(),
      user: { get: jest.fn(), setProperties: jest.fn(), clear: jest.fn() },
    };

    (global as any).fcWidget = fcWidget;
    return fcWidget;
  }

  public static destruirMock() {
    (global as any).fcWidget = undefined;
  }
}
