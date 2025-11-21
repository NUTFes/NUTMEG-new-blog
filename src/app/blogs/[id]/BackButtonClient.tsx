'use client';

import NavigationButton from '../../components/NavigationButton';

export default function BackButtonClient() {
  return (
    <NavigationButton
      text="前のページに戻る"
      onClick={() => window.history.back()}
      arrowLeft
    />
  );
}
