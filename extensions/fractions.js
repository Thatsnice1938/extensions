(function (Scratch) {
  'use strict';

  const STRETCH_X = Symbol('stretch.x');
  const STRETCH_Y = Symbol('stretch.y');

  const vm = Scratch.vm;

  /**
   * @param {VM.RenderedTarget} target
   * @param {VM.RenderedTarget} [originalTarget] If target is a clone, the original to copy from.
   */
  const implementStretchForTarget = (target, originalTarget) => {
    if (STRETCH_X in target) {
      // Target already has stretch. Don't implement again.
      return;
    }

    target[STRETCH_X] = originalTarget ? originalTarget[STRETCH_X] : 100;
    target[STRETCH_Y] = originalTarget ? originalTarget[STRETCH_Y] : 100;

    const original = target._getRenderedDirectionAndScale;
    target._getRenderedDirectionAndScale = function () {
      const result = original.call(this);

      result.scale[0] *= this[STRETCH_X] / 100;
      result.scale[1] *= this[STRETCH_Y] / 100;

      return result;
    };
  };
  vm.runtime.targets.forEach((target) => implementStretchForTarget(target));
  vm.runtime.on('targetWasCreated', (target, originalTarget) => implementStretchForTarget(target, originalTarget));
  vm.runtime.on('PROJECT_LOADED', () => {
    vm.runtime.targets.forEach((target) => implementStretchForTarget(target));
  });

  /**
   * @param {VM.RenderedTarget} target
   */
  const forceUpdateDirectionAndScale = (target) => {
    target.setDirection(target.direction);
  };

  class Stretch {
    getInfo() {
      return {
        id: 'stretch',
        name: 'Stretch',
        color1: '#4287f5',
        color2: '#2b62ba',
        color3: '#204785',
        blocks: [
          {
            opcode: 'setStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch to x: [X] y: [Y]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: 'changeStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change stretch by x: [DX] y: [DY]',
            arguments: {
              DX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              DY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },

          '---',

          {
            opcode: 'setStretchX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch x to [X]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              }
            },
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: 'setStretchY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch y to [Y]',
            arguments: {
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              }
            },
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: 'changeStretchX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change stretch x by [DX]',
            arguments: {
              DX:
