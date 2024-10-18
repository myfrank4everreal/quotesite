from django.shortcuts import render, get_object_or_404, redirect
from .models import Quote, FavouriteQuote
from django.contrib.auth.decorators import login_required

# for user registration setup
from .forms import UserRegisterForm
from django.contrib import messages



def register(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now login')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'quoteapp/registration/register.html', {'form':form})


def quote_list(request):
    quotes = Quote.objects.all()
    return render(request, 'quoteapp/quote_list.html', {'quotes':quotes})


def quote_detail(request, quote_id):
    quote = get_object_or_404(Quote, id=quote_id)
    context= {
        'quote':quote,
    }
    return render(request, 'quoteapp/quote_detail.html', context)

@login_required
def add_favorite(request, quote_id):
    quote = get_object_or_404(Quote, id=quote_id)
    favorite = FavouriteQuote.objects.filter(user=request.user, quote=quote)
    if favorite.exists:
        print('quote already added to favourites')
    else:
        FavouriteQuote.objects.get_or_create(user=request.user, quote=quote)
    return redirect(quote_detail, quote=quote.id)

@login_required
def remove_favorite(request, quote_id):
    quote = get_object_or_404(Quote, id=quote_id)
    favourite = FavouriteQuote.objects.filter(user=request.user, quote = quote)
    if favourite.exists():
        favourite.delete()

    return redirect(quote_detail, quote_id=quote.id)


