import { onMounted, ref } from 'vue';
import Hammer from 'hammerjs';

export const useSwipe = (
  elementId: string,
  onLeftSwipe: () => void,
  onRightSwipe: () => void
) => {
  const transitionName = ref('slide-right');
  onMounted(() => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const manager = new Hammer.Manager(el);
    const Swipe = new Hammer.Swipe();
    manager.add(Swipe);

    manager.on('swipeleft', () => {
      transitionName.value = 'slide-left';
      onLeftSwipe();
    });
    manager.on('swiperight', () => {
      transitionName.value = 'slide-right';
      onRightSwipe();
    });
  });

  return { transitionName };
};
