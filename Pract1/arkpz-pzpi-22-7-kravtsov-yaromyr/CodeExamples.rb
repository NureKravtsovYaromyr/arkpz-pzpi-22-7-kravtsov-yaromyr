# Структура коду

# Правильно:
# app/models/user.rb
class User
  # Код класу User
end

# Неправильно:
# user.rb
class user
# Код класу user
end

# Форматування коду

# Правильно:
def some_method
  if condition
    do_something
  end
end

# Неправильно:
def some_method
    if condition
          do_something
    end
end

# Іменування

# Правильно:
class UserProfile
  MAX_ATTEMPTS = 3

  def initialize(user_name)
    @user_name = user_name
  end
end

# Неправильно:
class userprofile
  MaxAttempts = 3

  def Initialize(UserName)
    @UserName = UserName
  end
end

# Коментарі

# Правильно:
# Обчислює факторіал числа рекурсивно
def factorial(n)
  return 1 if n <= 1
  n * factorial(n - 1)
end

# Неправильно:
# Метод факторіал
def factorial(n)
  # Якщо n менше або дорівнює 1, повернути 1
  if n <= 1
    return 1
  end
  # Повернути n помножене на факторіал n мінус 1
  n * factorial(n - 1)
end

# Документування коду

# Правильно:
# Клас для роботи з користувачами
class User
  # Ініціалізує користувача з ім'ям
  #
  # @param name [String] ім'я користувача
  def initialize(name)
    @name = name
  end
end

# Неправильно:
class User
  def initialize(name)
    @name = name
  end
end

# Приклади оформлення коду

# Правильно:
def calculate_total(price, tax_rate)
  total = price + (price * tax_rate)
  total.round(2)
end

# Неправильно:
def calcTotal(p, t)
total=p+(p*t)
return total.round 2
end
