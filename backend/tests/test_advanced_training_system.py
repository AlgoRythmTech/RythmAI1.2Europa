import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
import importlib

def test_import_advanced_training_system():
    assert importlib.util.find_spec('advanced_training_system') is not None
