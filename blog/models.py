from django.db import models
from django.utils.translation import gettext as _


# Create your models here.
class PersonQuerySet(models.QuerySet):
    def activity(self):
        return self.filter(role="A")

    def exclaim(self):
        return self.filter(role="E")

    def code(self):
        return self.filter(role="C")

    def lightning(self):
        return self.filter(role="L")

    def stars(self):
        return self.filter(role="S")

    def question(self):
        return self.filter(role="Q")


class BlogManager(models.Manager):
    def get_queryset(self):
        return PersonQuerySet(self.model, using=self._db)

    def get_post_from_title(self, title):
        return super().get_queryset().filter(title=title)


class Blog(models.Model):
    title = models.CharField(max_length=50, null=True)
    subtitle = models.CharField(max_length=100, null=True)
    last_updated = models.DateTimeField(auto_now=True)
    mood = models.CharField(
        max_length=1,
        null=True,
        choices=[("A", _("Activity")), ("E", _("Exclaim")), ("C", _("Code")), ("L", _("Lightning")), ("S", _("Stars")),
                 ("Q", _("Question"))]
    )
    body = models.TextField(null=True)

    class Meta:
        verbose_name = "Blog"

    def __str__(self):
        return str(self.title)

    blogs = BlogManager()
