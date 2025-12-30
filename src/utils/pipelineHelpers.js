export function findStep(steps, name) {
  return steps.find((s) => s.step === name)?.data ?? null;
}

export function buildPipelineView(steps) {
  return {
    tokens: findStep(steps, "tokens"),
    parse: findStep(steps, "parse"),
    drs: findStep(steps, "dịch") || findStep(steps, "dịch_FOL"),
    folProver:
      findStep(steps, "wh_query") ||
      findStep(steps, "yn_query") ||
      findStep(steps, "wh_query_pattern_1") ||
      findStep(steps, "yn_query_pattern_1") ||
      findStep(steps, "logic") ||
      findStep(steps, "prover") ||
      null,
    resultRaw:
      findStep(steps, "wh_result") ||
      findStep(steps, "yn_result") ||
      findStep(steps, "wh_result_pattern_1") ||
      findStep(steps, "yn_result_pattern_1") ||
      null,
  };
}
