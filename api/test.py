from flask import Blueprint

test_blueprint = Blueprint('test_blueprint', __name__)

@test_blueprint.route("/api/test")
def hello_test():
    return "<p>Ciao,wewew World!</p>"
