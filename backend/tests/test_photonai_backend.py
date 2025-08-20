import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
import importlib

def test_import_photonai_backend():
    assert importlib.util.find_spec('photonai_backend') is not None
