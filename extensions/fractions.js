class Fractions {
  getInfo() {
    return {
      id: 'fractions',
      name: 'Fractions and Percentage',
      blocks: [
        {
          opcode: 'decimals',
          blockType: Scratch.BlockType.REPORTER,
          text: '[ONE] ÷ [TWO] as decimal',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.NUMBER
            },
            TWO: {
              type: Scratch.ArgumentType.NUMBER
            }
          }
        },
        {
          opcode: 'percentage',
          blockType: Scratch.BlockType.REPORTER,
          text: '[ONE] ÷ [TWO] as %',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.NUMBER
            },
            TWO: {
              type: Scratch.ArgumentType.NUMBER
            }
          }
        },
        {
          opcode: 'fraction',
          blockType: Scratch.BlockType.REPORTER,
          text: '[DECIMAL] as fraction',
          arguments: {
            DECIMAL: {
              type: Scratch.ArgumentType.NUMBER
            }
          }
        },
        {
          opcode: 'improperToMixed',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [NUMERATOR] / [DENOMINATOR] to mixed fraction',
          arguments: {
            NUMERATOR: {
              type: Scratch.ArgumentType.NUMBER
            },
            DENOMINATOR: {
              type: Scratch.ArgumentType.NUMBER
            }
          }
        },
        {
          opcode: 'mixedToImproper',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [WHOLE] [NUMERATOR] / [DENOMINATOR] to improper fraction',
          arguments: {
            WHOLE: {
              type: Scratch.ArgumentType.NUMBER
            },
            NUMERATOR: {
              type: Scratch.ArgumentType.NUMBER
            },
            DENOMINATOR: {
              type: Scratch.ArgumentType.NUMBER
            }
          }
        }
      ]
    };
  }

  decimals(args) {
    const result = args.ONE / args.TWO;
    return result.toFixed(2);
  }

  percentage(args) {
    const result = (args.ONE / args.TWO) * 100;
    return result.toFixed(2);
  }

  improperToMixed(args) {
    const numerator = args.NUMERATOR;
    const denominator = args.DENOMINATOR;

    const whole = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;

    return `${whole} ${remainder}/${denominator}`;
  }

  mixedToImproper(args) {
    const whole = args.WHOLE;
    const numerator = args.NUMERATOR;
    const denominator = args.DENOMINATOR;

    const improperNumerator = (whole * denominator) + numerator;

    return `${improperNumerator}/${denominator}`;
  }

  fraction(args) {
    const decimal = args.DECIMAL;

    let numerator = decimal;
    let denominator = 1;
    let precision = 1e-6; // Set the precision for the fraction approximation

    while (Math.abs(Math.round(numerator) - numerator) > precision) {
      denominator++;
      numerator = decimal * denominator;
    }

    return `${Math.round(numerator)}/${denominator}`;
  }
}

Scratch.extensions.register(new Fractions());
