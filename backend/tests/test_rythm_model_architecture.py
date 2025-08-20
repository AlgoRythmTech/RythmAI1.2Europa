import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
import importlib

def test_import_rythm_model_architecture():
    assert importlib.util.find_spec('rythm_model_architecture') is not None
