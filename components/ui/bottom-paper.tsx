import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import colors from '@/constants/colors';
import { useColorScheme } from 'nativewind';


type BottomPaperProps = {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
};

const BottomPaper = forwardRef<BottomSheet, BottomPaperProps>(
  ({ children, snapPoints = ['40%'] }, ref) => {
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

const {colorScheme} = useColorScheme();

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        }}
        handleIndicatorStyle={{
          backgroundColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomPaper;





