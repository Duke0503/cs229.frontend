export function findStep(steps, name) {
  return steps.find((s) => s.step === name)?.data ?? null;
}

export function buildPipelineView(steps) {
  return {
    tokens: findStep(steps, "tokens"),
    parse: findStep(steps, "parse"),
    drs: findStep(steps, "dịch") || findStep(steps, "dịch_FOL"),
    folProver:
      findStep(steps, "wh_query") || findStep(steps, "yn_query") || null,
    resultRaw:
      findStep(steps, "wh_result") || findStep(steps, "yn_result") || null,
  };
}
