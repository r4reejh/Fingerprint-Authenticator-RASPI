import FPS, sys
def LegacyEnroll(fps):
    '''
    Enroll test
    '''
    print 'Place Finger To Identify'
    while not fps.IsPressFinger():
      FPS.delay(1)
    if fps.CaptureFinger(True):
        #remove finger
        print 'remove finger'
        iret = fps.Identify1_N()
        print 'identified at position',iret

if __name__ == '__main__':
    fps = FPS.FPS_GT511C3() #settings for raspberry pi GPIO
    fps.Open()
    if fps.SetLED(True):
        LegacyEnroll(fps)
        fps.SetLED(False)
