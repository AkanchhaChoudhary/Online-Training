

# Create your views here.
from django.http import HttpResponse

def hello(request):

    print(request.COOKIES)


    oldval = request.COOKIES.get('zap', None)

    resp = HttpResponse('view count=1,view count=2,view count=3 ,daf64245 '+str(oldval))

    if oldval :

        resp.set_cookie('zap', int(oldval)+1) # No expired date = until browser close

    else :

        # resp.set_cookie('zap', 42) # No expired date = until browser close

        # resp.set_cookie('sakaicar', 42, max_age=1000) # seconds until expire

        resp.set_cookie('dj4e_cookie', 'daf64245', max_age=1000)

    return resp

