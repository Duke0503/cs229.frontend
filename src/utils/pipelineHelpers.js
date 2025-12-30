export function findStep(steps, name) {
  return steps.find((s) => s.step === name)?.data ?? null;
}

export function buildPipelineView(steps) {
  return {
    tokens: findStep(steps, "tokens"),
    parse: findStep(steps, "dịch_FOL"),
    drs: findStep(steps, "merged"),
    folProver: findStep(steps, "logic"),
    resultRaw:
      findStep(steps, "wh_result") ||
      findStep(steps, "yn_result") ||
      findStep(steps, "wh_result_pattern_1") ||
      findStep(steps, "yn_result_pattern_1") ||
      findStep(steps, "prover") ||
      null,
  };
}
