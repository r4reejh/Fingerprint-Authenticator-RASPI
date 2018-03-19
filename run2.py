import FPS, sys
def LegacyEnroll(fps):
    '''
    Enroll test
    '''

    enrollid=0
    okid=False
    #search for a free enrollid, you have max 200
    while not okid and enrollid < 200:
        okid = fps.CheckEnrolled(enrollid)
        if not okid:
            break
        else:
            enrollid = enrollid+1
    if enrollid <200:
        #press finger to Enroll enrollid
        print 'Press finger to Enroll %s' % str(enrollid)
        fps.EnrollStart(enrollid)
        while not fps.IsPressFinger():
            FPS.delay(1)
        iret = 0
        if fps.CaptureFinger(True):
            #remove finger
            print 'remove finger'
            fps.Enroll1()
            print 'Press same finger again'
            while not fps.IsPressFinger():
                FPS.delay(1)
            if fps.CaptureFinger(True):
                #remove finger
                print 'remove finger'
                fps.Enroll2()
                print 'press same finger yet again'
                while not fps.IsPressFinger():
                    FPS.delay(1)
                if fps.CaptureFinger(True):
                    #remove finger
                    iret = fps.Enroll3()
                    if iret == 0:
                        print 'Enrolling Successfull'
                    else:
                        print 'Enrolling Failed with error code: %s' % str(iret)
                else:
                    print 'Failed to capture third finger'
            else:
                print 'Failed to capture second finger'
        else:
            print 'Failed to capture first finger'
    else:
        print 'Failed: enroll storage is full'

if __name__ == '__main__':
    fps = FPS.FPS_GT511C3() #settings for raspberry pi GPIO
    fps.Open()
    if fps.SetLED(True):
        LegacyEnroll(fps)
        fps.SetLED(False)
