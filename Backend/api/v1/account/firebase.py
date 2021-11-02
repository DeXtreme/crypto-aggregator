import firebase_admin
from firebase_admin import auth

firebase = firebase_admin.initialize_app()

def getFirebaseUser(token):
    """Get Firebase user details
    
    Parameters
    ----------

    token: str
        The token provided by firebase after sigin

    Returns
    -------
    dict
        uid: str
            The userId of the user
        name: str
            The display name of the user
        photourl: str
            A link to the user photo
    """
    claims = auth.verify_id_token(token)
    uid = claims["uid"]
    fb_user = auth.get_user(uid)

    name = fb_user.display_name
    photo = fb_user.photo_url

    return {"uid": uid, "name": name, "photourl": photo}