export const getInstructions = (wave: {
  readonly actions: ReadonlyArray<string>;
  readonly reload: boolean;
  readonly shop: string;
}) => ({
  reload: wave.reload,
  actions: wave.actions.filter(
    (action) => action !== "" && action !== "Reroll",
  ),
  shop: wave.shop,
  reroll: wave.actions.filter((action) => action === "Reroll").length,
});
