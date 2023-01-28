import { onMounted, ref } from 'vue';
import Hammer from 'hammerjs';

export const usePageSwipe = (
  elementId: string,
  onLeftSwipe: () => void,
  onRightSwipe: () => void
) => {
  const transitionName = ref('slide-right');
  onMounted(() => {
    const page = document.getElementById(elementId);
    if (!page) return;
    const manager = new Hammer.Manager(page);
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
